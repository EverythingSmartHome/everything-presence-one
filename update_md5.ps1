# Script to update all *-manifest.json files with correct MD5 hashes for OTA files

# Find all manifest files in the root directory
$manifestFiles = Get-ChildItem -Path . -Filter "*-manifest.json"

Write-Host "Found $($manifestFiles.Count) manifest files to process."

foreach ($manifestFile in $manifestFiles) {
    Write-Host "Processing $($manifestFile.Name)..."
    
    # Read the manifest file
    $manifestContent = Get-Content -Path $manifestFile.FullName -Raw | ConvertFrom-Json
    
    # Process each build entry
    foreach ($build in $manifestContent.builds) {
        if ($build.ota -and $build.ota.path) {
            $otaPath = $build.ota.path
            
            # Try different path resolutions
            $possiblePaths = @(
                # Direct path
                $otaPath,
                # Path relative to current directory
                (Join-Path -Path "." -ChildPath $otaPath),
                # Just the binary name from the path (if in a subfolder)
                (Split-Path -Path $otaPath -Leaf)
            )
            
            $fileFound = $false
            foreach ($path in $possiblePaths) {
                if (Test-Path $path) {
                    # Calculate MD5 hash
                    $md5 = (Get-FileHash -Algorithm MD5 -Path $path).Hash.ToLower()
                    
                    Write-Host "  - File found at: $path"
                    Write-Host "  - Old MD5: $($build.ota.md5)"
                    Write-Host "  - New MD5: $md5"
                    
                    # Update MD5 in manifest
                    if ($build.ota.md5 -ne $md5) {
                        $build.ota.md5 = $md5
                        Write-Host "  - MD5 updated."
                    } else {
                        Write-Host "  - MD5 already correct."
                    }
                    
                    $fileFound = $true
                    break
                }
            }
            
            if (-not $fileFound) {
                Write-Host "  - WARNING: File not found for path: $otaPath"
                # Check if the directory exists
                $dirPath = Split-Path -Path $otaPath -Parent
                if (Test-Path $dirPath) {
                    Write-Host "  - Directory exists: $dirPath"
                    Write-Host "  - Files in directory:"
                    Get-ChildItem -Path $dirPath | ForEach-Object { Write-Host "    - $($_.Name)" }
                } else {
                    Write-Host "  - Directory does not exist: $dirPath"
                }
            }
        }
    }
    
    # Save updated manifest
    $manifestContent | ConvertTo-Json -Depth 10 | Set-Content -Path $manifestFile.FullName
    Write-Host "  - Saved updated manifest."
}

Write-Host "All manifests processed." 