BerryCam Express
================

First of all make sure that you have the latest version of raspbian running on your Raspberry Pi:

``` 
sudo apt-get upgrade
sudo apt-get update
```

### Install NodeJS and Node Package Manager

Install the Node packages for Raspberry Pi. These will be downloaded into the `/home/pi` folder:

```
wget http://nodejs.org/dist/v0.10.2/node-v0.10.2-linux-arm-pi.tar.gz
cd /usr/local
sudo tar -xvzf ~/node-v0.10.2-linux-arm-pi.tar.gz --strip=1
```

Once this is completed, check the version installed:

```
node -v
```

You should see `v0.10.2` or the version that you have installed. This concludes that NodeJS is now installed.
Check that the Node Package Manager is installed:

```
npm -v
```

which should reveal the version number `1.2.15` or the version that you have installed.


### Clone the BerryCam Express project onto your Raspberry Pi

We need to pull all the code that runs BerryCam Express down into your user directory (or the location of your choosing). To clone within the `/home/pi` directory:

```
git clone https://github.com/pitography/BerryCamExpress.git
```

### Install additional project dependencies (takes around 5 minutes)

This command installs a package, and any packages that it depends on. Although this take quite some time given the amount of processing power initially required, it makes it easy to fetch all the required components and libraries.

We re-issue the command:

```
cd BerryCamExpress
npm install
```

After a few minutes, the package will install additional dependencies that allow it to run.

### Start the server

Now that we have all the necessary components in place, we can start the BerryCam Express server which allows devices to connect to your Pi and take photographs with the camera.

To start the camera server:
```
cd dist
node berrycam-server.js
```

Browse to the pi on any device with a web browser on port 3000 - so if your pi was on IP address 192.168.0.5 then you would type 

```
192.168.0.5:3000
```

The interface should appear on the screen. Press the camera button to take a test photograph.

### Using the app

For more information and tips on using BerryCam Express head on over to the wiki:
https://github.com/pitography/BerryCamExpress/wiki/Taking-Pictures
