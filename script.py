# install the requests package using 'python -m pip install requests'
import json
from collections import namedtuple

import requests

import rhinoscriptsyntax as rs

customers = requests.post(
    'https://api.td-davinci.com/api/raw-customer-data',
    headers = { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiZjZhZWQyMTEtZTk5YS0zNjE2LThmZTAtYmYxZmE0YmRiNWMzIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiJmNGFhMjZlYS04Yzk3LTQzOGYtOWQyYy1lODMzZTM4NDFhNTYifQ.MpK7XJ_B482aLh6J04-iafgindgH21GZ2rEtsdSsuLA' },
    json={ 'continuationToken': '' }
).json()['result']['customers']

Location = namedtuple("Location", "lat long")
customer_info = {
    customer["id"] : {
        "location": Location(
            customer["addresses"]["principalResidence"]["latitude"], 
            customer["addresses"]["principalResidence"]["longitude"]
        )
    }
    for customer in customers
}

#Get the file name for the new file to write
filter = "JSON File (*.json)|*.json|All Files (*.*)|*.*||"
filename = rs.SaveFileName("Save JSON file as", filter)

# If the file name exists, write a JSON string into the file.
if filename:
    # Writing JSON data
    with open(filename, 'w') as f:
        json.dump(customer_info, f)
