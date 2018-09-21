# Setting up the Livestream from the raspberry pi

First go the heroku application website
[Heroku](https://wotwebrtc1718.herokuapp.com/)
    
    roomnumber : w3b0fth!ngss

# using python code in raspberry pi

## install modules

### Rpio.GPIO
    sudo apt-get update
    sudo apt-get -y install python-rpi.gpio

### firebase-admin
    sudo pip install firebase-admin

### Adafruit_DHT library
first install git using	
	
	sudo apt-get install git-core
download the library using git
    
    git clone https://github.com/adafruit/Adafruit_Python_DHT.git
Go inside the directory using
    
    cd Adafruit_Python_DHT
Then answer this command
    
    sudo apt-get install build-essential python-dev
Install the library with
    
    sudo python setup.py install

## run the script
    sudo python3 Smarthome.py

