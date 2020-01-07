## Linux setup
For this project, the official Raspbian Buster Lite is being used.
The main goal is to boot into a fullscreen chromium browser as soon as the pi starts.

- Setup a headless pi with SSH over Wi-Fi (Step A)
> https://desertbot.io/blog/headless-raspberry-pi-3-bplus-ssh-wifi-setup/

- Setup a boot-to-chromium (kiosk mode + no-sleep) (Step B)
> https://desertbot.io/blog/raspberry-pi-touchscreen-kiosk-setup/
> Step 7 can be reused to add autostart script in the future

- Start the Pi and connect via SSH

- Install NodeJS
```
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
$ sudo apt install nodejs
$ node --version
```

- Install serve
```
npm install -g serve
```

- Start serve before chromium-browser
```
$ sudo nano /etc/xdg/openbox/autostart
```
This is the `autostart` file edited at Step 7 on link **Step B**
Replace this line
```
chromium-browser  --noerrdialogs --disable-infobars --kiosk $KIOSK_URL
```
by this 
```
serve $APP_PATH -l 5000 &
chromium-browser  --noerrdialogs --disable-infobars --kiosk http://localhost:5000
```

Edit the `environment` file to add the `$APP_PATH` env var
```
$ sudo nano /etc/xdg/openbox/environment
```
Assuming your project's build folder is `/home/pi/mirror/build/`, add this line
```
export APP_PATH=/home/pi/mirror/build/
```

- Save everything and `$ sudo reboot`



## Apps setup

get accuweather location key
https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/search
fulfill form items, send a request, ket the first "key" parameter from returned JSON

features
- flat vector icons for any resolution display
- custom layout from scratch
- no external UI dependencies, high fidelity custom UI