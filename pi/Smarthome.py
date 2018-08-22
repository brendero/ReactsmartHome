import firebase_admin 
import RPi.GPIO as GPIO 
import time
import colorsys
import math
import Adafruit_DHT
from sense_hat import SenseHat 
from firebase import firebase 
from firebase_admin import credentials 
from firebase_admin import db


default_app = firebase_admin.initialize_app(credentials.Certificate({ 
  "type": "service_account", 
  "project_id": "your-credentials-here", 
  "private_key_id": "your-credentials-here", 
  "private_key": "your-credentials-here", 
  "client_email": "your-credentials-here", 
  "client_id": "your-credentials-here", 
  "auth_uri": "your-credentials-here", 
  "token_uri": "your-credentials-here", 
  "auth_provider_x509_cert_url": "your-credentials-here", 
  "client_x509_cert_url": "your-credentials-here" 
}),
{
    'databaseURL': 'your-database-url'
})

GPIO.setmode(GPIO.BOARD)

#Airconditioning GPIO
GPIO.setup(12, GPIO.OUT)

#buzzer GPIO
GPIO.setup(11, GPIO.OUT)

#White lights GPIO
GPIO.setup(15, GPIO.OUT)
GPIO.setup(13, GPIO.OUT)

#Moodlight GPIO
GPIO.setup(22, GPIO.OUT)
Rpwm=GPIO.PWM(22, 50)
Rpwm.start(0)

GPIO.setup(18, GPIO.OUT)
Gpwm=GPIO.PWM(18, 50)
Gpwm.start(0)

GPIO.setup(16,GPIO.OUT)
Bpwm=GPIO.PWM(16,50)
Bpwm.start(0)


hometempRef = db.reference('climateControl/homeTemp')
def setHomeTempfirebase():
    humidity, temperature = Adafruit_DHT.read_retry(11, 4)
    hometempRef.set(temperature)
    
    
def hsv2rgb(h,s,v):
    return tuple(round(i * 255) for i in colorsys.hsv_to_rgb(h,s,v))

def moodLight():
    moodlightRef = db.reference('Lights/Moodlight').get()
    if moodlightRef["on"] == "True":
        colors = moodlightRef["color"]
        #Convert the Hsv value from firebase to RGB
        if(colors["h"] < 0):
            colors["h"] = 360+colors["h"]

        rgbColor = hsv2rgb(colors["h"]/360,colors["s"]/100,colors["v"]/100)

        #put individual color values in variables
        R = rgbColor[0]
        G = rgbColor[1]
        B = rgbColor[2]
        
        #TODO: Use rule of thirds to convert calues to percent
        Rduty = R/255*100
        Gduty = G/255*100
        Bduty = B/255*100

        #set the dutycycle of designated GPIO pins
        Rpwm.ChangeDutyCycle(Rduty)
        Gpwm.ChangeDutyCycle(Gduty)
        Bpwm.ChangeDutyCycle(Bduty)
        
    else:
        Rpwm.ChangeDutyCycle(0)
        Gpwm.ChangeDutyCycle(0)
        Bpwm.ChangeDutyCycle(0)
        
def Alert():  
    #Make lights flicker and buzzer go off 
    alertNotice = db.reference('Alert').get() 
    while alertNotice["on"] == "True":
        alertNotice = db.reference('Alert').get() 
        GPIO.output(11, True)
        GPIO.output(15, True)
        GPIO.output(13, True)
        time.sleep(1) 
        GPIO.output(11, False)
        GPIO.output(16, False)
        GPIO.output(13, False)
 
def AirRegulation(): 
    reqTemp = db.reference('climateControl/thermostat').get()
    #TODO: getraspberrypitemp
    hum, temp = Adafruit_DHT.read_retry(11,4)
    if reqTemp > temp:
        #print('ifstatement') 
        GPIO.output(12,True) 
    else: 
        GPIO.output(12,False) 

def LightToggle(ref,gpno):
    lightRef = db.reference('Lights/'+ref).get()
    if lightRef == "True":
        GPIO.output(gpno,True)
    else:
        GPIO.output(gpno,False)
        
try: 
    while True:
        setHomeTempfirebase()
        AirRegulation() 
        Alert()
        LightToggle('KitchenLight',15)
        LightToggle('BedroomLight',13)
        moodLight() 
         
         
 
except KeyboardInterrupt: 
    pass
    GPIO.cleanup()
