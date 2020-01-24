# cayenne-raspberry-camera

Integration of Raspberry Pi camera with Cayenne. Takes a photo after pressing a button on dashboard and sends it with e-mail and/or Slack. Tested on Raspberry Pi 3 Model B (Sony, UK) with original camera.

## How to use

1. Add new BYOD (bring your own device) on [Cayenne Dashboard](https://cayenne.mydevices.com/cayenne/dashboard/add).
2. Edit `config.js` with your settings.
3. Add new button from custom widgets to your BYOD:
    - Data: Digital Actuator
    - Unit: Digital (0/1)
    - Channel: 1
4. Run `yarn start`
