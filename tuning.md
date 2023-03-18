---
layout: default
title: Tuning
nav_order: 9
---

# FAQ

{: .no_toc }

mmWave is incredibly sensitive in comparison to a regular PIR, and needs the settings tweaking to suit it's environment. This will also help you get the most out of the EP1's occupancy.
{: .fs-6 .fw-300 }

## Placement

One of the first things to start with is to think about the placement in a room.

Ideally you'll want the sensor wall mounted or on a sturdy object like a shelf or cabinet - because the mmWave is extremely good at picking up really fine movement, the object it's mounted needs to be solid, otherwise this could introduce false detections (because there is genuine movement).

{: .important }
Don't place the EP1 on top of something that moves with vibrations such as an air-conditioning unit, as these small vibrations will be treated as detections.

You also don't want to place it infront of or near things that move frequently too, as again, these will be picked up as detections.

I've seen a number of users confused thinking that the sensor is being triggered "falsely". The vast majority of these are actually **real** detections - users just weren't aware that something was moving, or how tiny a movement mmWave sensors can detect! I don't blame you either, since the only real benchmark you have to go on is a regular PIR, which by comparison, take quite a lot of movement to trigger.

Common things that users don't realise can be triggers are:
* AC units
* Plants moving in the wind
* Curtains moving in the wind
* Water droplets in a bathroom
* Ceiling fans
* Fans inside of a laptop/TV

There are ways to try and combat these movements, which we will discuss below - but if you can, try and avoid placement really close to things that move. 

The mmWave sensor can also "see through" objects, which includes really thin walls - this means that movement could be detected through a wall (but generally this is only really thin walls.)

## Distance

Once you have the placement set, next you should adjust the distance to the room.

Distance is really important to set correctly and should be set according to the distance of the room you have the EP1 in. If you have the distance set too short, you might miss events that are outside of the range. If it's set too long for the room, it might catch things that are outside of the room, or it can cause the signal to "bounce".

{: .important }
Don't set the distance too long for the room it is place in - this can cause undesirable results.

You don't need to be very accurate with the distance, just a rough ball park within roughly 0.5m.

## Sensitivity and Latency

Finally you can adjust the sensitivity and On Latency - both of these paremeters will take the most tuning to suit your environment and do require some on the fly tweaking.

Sensitivity is how much motion is required to trigger the sensor.

On Latency sets for how long the object must be moving for, before it is considered as moving and thus triggering the sensor. Adding a very small on latency to the sensor will make the mmWave sensor slightly slower to respond, but **can** drastically reduce detections from unwanted objects, such as a plant moving.

{: .important }
Making the mmWave slower to respond should have zero impact, since I would recommend using the EP1's PIR for things that you want to trigger on.

I would recommend starting with 0s of on latency first, which will give you the fastest response time as a nice to have. Then start at a medium sensitivity at a 4-5.

Observe the results over a good period of time and check to see if firstly that it is detecting presence accurately when you are in the room, and secondly that is changing to clear (no detection) when you aren't in the room.

If the sensor occasionally changes to not detected for a few seconds when you are in the room, you probably need more sensitivity. However, increasing sensitivity can sometimes cause detections from unwanted objects when you are not in the room, so to combat this, use the on latency and add 0.5s.

0.5s of on latency is generally enough to clear up all detections from undesireable objects, but you can increase more if needed. Start low and increment one step at a time.

The process I use is:

1. Start at 0s with 4 sensitivity
2. Observe results
3. Increase one sensitivity level to get accurate detections when I am in the room
4. Observe results and repeat until desireable results achieved
5. Once sensitvity is correct, observe any detections when room is un-occupied
6. If detections are being triggered when room is un-occupied, add 0.5s to on latency
7. Observe results, if needed add another 0.5s to on latency
8. Optional - Adding on latency may allow you to increase sensitivity if needed.

Ultimately, the best settings for you will come down to your specific room and will depend on your environment.