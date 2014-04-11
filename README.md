BerryCamExpress
===============

## Full build and setup
1. Install nodejs on the pi
2. Install Bower on the pi - 'npm install -g bower'
3. Install Grunt on the pi - 'npm install -g grunt-cli'
4. Clone project from git - 'git pull git@github.com:pitography/BerryCamExpress.git'
5. Go to <install-directory> - run 'npm install' to install project dependencies (will take 20+ minutes to complete)
6. Run 'grunt pi' - will build the application (will take 5+ minutes to complete)
7. Go to <install-directory>/dist/ - run 'node berrycam-server.js' - will start the camera server program at http://localhost:3000
8. Hit the shutter button on the browser - it should be working...

## Quick set-up
1. Install nodejs on the pi
2. Clone project from git - 'git pull git@github.com:pitography/BerryCamExpress.git'
3. Go to <install-directory> - run 'npm install'
4. Go to <install-directory>/dist/ - run 'node berrycam-server.js'
