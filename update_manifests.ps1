# Script to update all manifest.json files with correct MD5 hashes for factory.bin files

# Find all build directories with manifest.json files
$buildDirs = Get-ChildItem -Path . -Directory -Recurse -Include "*esp32" | Where-Object { Test-Path (Join-Path $_.FullName "manifest.json") }

Write-Host "Found $($buildDirs.Count) build directories with manifest.json files."

foreach ($dir in $buildDirs) {
    Write-Host "Processing $($dir.Name)..."
    
    # Read the manifest.json
    $manifestPath = Join-Path $dir.FullName "manifest.json"
    $manifest = Get-Content -Path $manifestPath -Raw | ConvertFrom-Json
    
    # Get the OTA bin file path
    $otaBinPath = Join-Path $dir.FullName $manifest.ota.path
    
    if (Test-Path $otaBinPath) {
        # Calculate the MD5 hash of the OTA bin file
        $otaMd5 = (Get-FileHash -Algorithm MD5 -Path $otaBinPath).Hash.ToLower()
        Write-Host "  - Calculated MD5 hash for $($manifest.ota.path): $otaMd5"
        
        # Update the manifest.json if the MD5 hash is different
        if ($manifest.ota.md5 -ne $otaMd5) {
            Write-Host "  - Updating OTA MD5 hash in manifest.json from $($manifest.ota.md5) to $otaMd5"
            $manifest.ota.md5 = $otaMd5
            $manifest | ConvertTo-Json -Depth 10 | Set-Content -Path $manifestPath
        } else {
            Write-Host "  - OTA MD5 hash in manifest.json is already correct."
        }
        
        # Now find and update the factory.bin file hash
        if ($manifest.parts -and $manifest.parts.Count -gt 0) {
            $factoryBinPath = Join-Path $dir.FullName $manifest.parts[0].path
            
            if (Test-Path $factoryBinPath) {
                # Calculate the MD5 hash of the factory.bin file
                $factoryMd5 = (Get-FileHash -Algorithm MD5 -Path $factoryBinPath).Hash.ToLower()
                Write-Host "  - Calculated MD5 hash for $($manifest.parts[0].path): $factoryMd5"
                
                # Add or update the MD5 hash for the factory.bin file
                if (-not $manifest.parts[0].md5) {
                    # Add the MD5 property if it doesn't exist
                    Write-Host "  - Adding factory.bin MD5 hash to manifest.json: $factoryMd5"
                    $manifest.parts[0] | Add-Member -MemberType NoteProperty -Name "md5" -Value $factoryMd5
                } elseif ($manifest.parts[0].md5 -ne $factoryMd5) {
                    # Update the MD5 hash if it's different
                    Write-Host "  - Updating factory.bin MD5 hash in manifest.json from $($manifest.parts[0].md5) to $factoryMd5"
                    $manifest.parts[0].md5 = $factoryMd5
                } else {
                    Write-Host "  - Factory.bin MD5 hash in manifest.json is already correct."
                }
                
                # Save the updated manifest
                $manifest | ConvertTo-Json -Depth 10 | Set-Content -Path $manifestPath
            } else {
                Write-Host "  - Error: Factory bin file not found at $factoryBinPath"
            }
        } else {
            Write-Host "  - Error: No parts found in manifest.json"
        }
    } else {
        Write-Host "  - Error: OTA bin file not found at $otaBinPath"
    }
}

Write-Host "Manifest update completed." 