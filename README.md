# cayenne-raspberry-camera

Integration of Raspberry Pi camera with Cayenne. Takes a photo after pressing a button on dashboard and sends it with e-mail and/or Slack. Tested on Raspberry Pi 3 Model B (Sony, UK) with original camera.

## How to use?

1. Add new Arduino device (`Add new -> Device/Widget -> Microcontrollers -> Arduino`) on [Cayenne Dashboard](https://cayenne.mydevices.com/cayenne/dashboard/add). 
2. Edit `config.js` with settings shown after completion of previous step and customize your settings.
3. Add new digital output actuator from actuators to your previously added device (`Add new -> Device/Widget -> Actuators -> Generic -> Digital Output`):
    - Device: choose device created in step 1
    - Connectivity: Virtual
    - Channel: 1
    - Widget: Button
4. Run `yarn start`
5. Click button on dashboard and wait for your e-mail and/or Slack message with photo
