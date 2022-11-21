---
layout: default
title: Assembly
nav_order: 3
---

# Assembly

{: .no_toc }

Time to assemble the hardware ready for setup!
{: .fs-6 .fw-300 }

## Case - Part 1

First you are going to want to grab 4 components of the case - the back, ball join, locking ring and stand.

Image
{: .label .label-red }

Insert the ball joint through the back of the case from the front side. Then, while holding the ball joint in place, use the locking ring to tighten in place.

Image
{: .label .label-red }

{: .important }
The locking ring has a slight groove on one side - make sure the groove faces the back of the case.

{: .note }
The ball joint will be pretty tight but will still rotate with enough force - this is intentional to allow you to orientate in any position.

Use your thumb to press against the back of the ball joint for support and then push the stand onto the ball joint.

{: .note }
The stand may be quite tight initially due to the 3D printing process, but should loosen up after a few rotations.

Image
{: .label .label-red }

## Board and Sensors

Grab the EP1 board, mmWave Sensor and PIR.

The the EP1 board and press it into the back of the case - each corner should click into place.

Image
{: .label .label-red }

Next, take the mmWave sensor and insert it into one of the two slots.

Image
{: .label .label-red }

Slot 1 at the top of the board gives you a wider horizontal field of view with a narrower vertical field of view. Slot 2 at the side of the board gives you a wider vertical field of view with a narrower horizontal field of view. Slot 1 is the recommendation for most people.

{: .warning }
Making sure to line up the 5v pin on the sensor with the 5v pin on the board.

{: .warning }
Please take extra care with the mmWave sensor when it's inserted into the slot since the pins will bend easily and could cause damage. Remove the sensor whenever moving or working on it.

Then take PIR sensor and push it into the PIR socket in the middle of the board. The PIR can only fit in the socket in one orientation.

Image
{: .label .label-red }

With both sensors and the board installed, it should look like this:

Image
{: .label .label-red }

## Case - Part 2

Finally, clip the front of the case on and into position.

Image
{: .label .label-red }

The final hardware will look like this:

## Next Steps

Now we have assembled the hardware, we can power on and connect it to WiFi.

[Connecting to WiFi](http://everythingsmarthome.github.io/everything-presence-one/connecting-wifi.html){: .btn .btn-blue }

<script>
const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

jtd.addEvent(toggleDarkMode, 'click', function(){
  if (jtd.getTheme() === 'dark') {
    jtd.setTheme('light');
    toggleDarkMode.textContent = 'Preview dark color scheme';
  } else {
    jtd.setTheme('dark');
    toggleDarkMode.textContent = 'Return to the light side';
  }
});
</script>
