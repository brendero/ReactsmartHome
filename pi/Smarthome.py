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
  "project_id": "smarthome-7e155", 
  "private_key_id": "b5886223f7a57f284f8c3ec3e7c5bcd9a8bb9e0f", 
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDP6UVwkQIlpbqX\ntnY+30gq1i3rgz7OYhSoJZrk4+1Gli4WBl2qJI0IiC9sqejPLrHCj6ce0bx3PUqq\njtdQC7MB6eIZE766G19Om+MTX1UYIHGSxci2iu066RPA0zf8EwJ7t0CNySvYpzy/\n+UJvNh/B9aStbF+1T0c5aSq2vtY7Q3fYpOqLfyo4noBawrr6vAftympbg7xNVAZv\nPqSUFIekwcYlzZryrjjLRzZvSx/83LS3uBge8PPnkt23pbBjf/W6ceY/OA/36Go0\nirHRhlhOTg3TpkIVwJr/8cYfXVQayJ8SVQXEnRHpEuXBKmH6/fu0Vbjxe4RTlSlr\nj/dcmzp9AgMBAAECggEAEHlyeCX1XphQPb9GhVrZ9BL+ln/S1TWuX1iDeomY/pPd\n2P7uIxI8XqWz5E9eVDRl/320h1ulLGmd5f/ljcEvkQJAWS5YWZTbq3Xsu1c9fejs\nNu4XJmfBvn5Dg275K68x7i2qHtIG+GbgCHIu0nMedxcI0nkY6Fv8z87GhK6AeTeN\nwwmtXwdmbdYIHIOZoOrVFlbG+2GLYFlyMxqdB8fVbui1h+VUoa0dTYXjXTU3fE31\nX/OBvRHtb3M5bzIBeuGj5/gy8HhtbpvKK1ClNiWWfKL+zTjU6tiTMGngs9k0cBvc\n0INBjzWGsGA5MWkIvS4+31KHU9+yLKm/cd5pgimw3QKBgQD0dUKr2/EKXYkwYy4m\navpk68lSIB28AqgDoFRTTJNSGBB5PkrM0kWS64f+wLqRb9B3WIvpnOMJjCtBFUYW\nRHIOZooZy1mVI34hrfpMwEcQNKazE7o3MAsLqcju53o6wLO4MftAFR1b8m3UmyxI\nTbzJ6yXJ3EhJtMVtFhWXOqvbwwKBgQDZukXg/ITuvoR64MUhhp0be0gqUPbyWIh9\nbrJPMH1afF5DKblNQ3i4R5tJFDxr982yjjU35TUU7mBSUqNmzv1mSX+jZ4bVlYBH\n4S5qWjeCwLKr1S/q9/lkGoG3ux7h4Iyl+5vHCv15CXsJrF2IPVnXJlbMHH6zVNH/\nfthqdORsvwKBgBQyyCJ5Fs57cgVsfHiyKCREkyrU+n/5XDaIfc8wKZAD6wCJlBae\nXR9JlMAI3qF7sqbZyx2vV9cHHN/QySy31RC5ijmdYrZ+60IPJPpIfNaq8wci3yUG\nNDNvgOm0eJX4LCFRB+iAlh9txYNmmt8ShUHNyx6Fs/dbF2DvDTOkpmSPAoGAI/Fn\nRcwKGeujrTFb+bviRb4lXK7/BWTuK17R2tbTatOrMAU8TO/9htZzYS4RB3XiJD7r\ntC2HhMwRZKW1yewT0wYBJzWZAbtrcPJQmkgIb/JlzI4mGfET352smmsunvVV4rTV\ns5cx3wBcqm0lB6+xHB59J7bwh6RSAo6rJW/kobsCgYEAlbPLC0EYSuRuhqMHA1DW\nZsnqbVkTqFYW+di5AfxhdJL6m8/VIthbnZ+DoWMKDvdi8jb7aSBRM/3BuR/NO2dN\nkcrXyoaMP2gDElfQmFEb5FEh13PLJi5lijB1LpQdkQfTS/PIqoY8vMaPpdnWiWX9\nK9i0MEd/9+jl+l/PxiHkZNA=\n-----END PRIVATE KEY-----\n", 
  "client_email": "firebase-adminsdk-ep3h4@smarthome-7e155.iam.gserviceaccount.com", 
  "client_id": "107561716405182770653", 
  "auth_uri": "https://accounts.google.com/o/oauth2/auth", 
  "token_uri": "https://accounts.google.com/o/oauth2/token", 
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", 
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ep3h4%40smarthome-7e155.iam.gserviceaccount.com" 
}),
{
    'databaseURL': 'https://smarthome-7e155.firebaseio.com/'
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
