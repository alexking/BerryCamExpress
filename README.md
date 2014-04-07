BerryCamExpress
===============
1. Install nodejs on the pi
2. Install Bower on the pi - 'npm install -g bower'
3. Install Grunt on the pi - 'npm install -g grunt-cli'
4. Check out project to a directory on the pi - eg /var/www/pi
5. Go to project directory - run 'npm install' to install project dependencies (will take 20+ minutes to complete)
7. Run 'grunt pi' - will build the application (will take 5+ minutes to complete)
8. Go to <install-directory>/app/ - run 'node berrycam-server.js' - will start the camera server program at http://localhost:3000
9. Hit the shutter button on the browser - it should be working...


