# install the requests package using 'python -m pip install requests'
import json
from collections import namedtuple

import requests

#import rhinoscriptsyntax as rs

apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiZjZhZWQyMTEtZTk5YS0zNjE2LThmZTAtYmYxZmE0YmRiNWMzIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiJmNGFhMjZlYS04Yzk3LTQzOGYtOWQyYy1lODMzZTM4NDFhNTYifQ.MpK7XJ_B482aLh6J04-iafgindgH21GZ2rEtsdSsuLA'
start = 'https://api.td-davinci.com/api/'

customers = requests.post(
    start + 'raw-customer-data',
    headers = { 'Authorization': apiKey},
    json = { 'continuationToken': '' }
).json()['result']['customers']

#print(customers)

Location = namedtuple("Location", "lat long")

customer_info = {
    customer["id"] : {
        "income": customer["totalIncome"] if ("totalIncome" in customer) else 0,
        "location": Location(
            customer["addresses"]["principalResidence"]["latitude"], 
            customer["addresses"]["principalResidence"]["longitude"]
        ),
    }
    for customer in customers
}


for customer in customers:
    transactions = requests.get(
        start + 'customers/' + customer["id"] + '/transactions', 
        headers = { 'Authorization': apiKey},
        json = { 'continuationToken': '' }
    ).json()['result']

    customer_info[customer["id"]]["transaction"] = []
    for transaction in transactions:
        if "locationLatitude" in transaction:
            customer_info[customer["id"]]["transaction"].append({
                    "amount": transaction["currencyAmount"],
                    "location": Location(transaction["locationLatitude"], transaction["locationLongitude"])
                })



with open('data.txt', 'w') as outfile:
    json.dump(customer_info, outfile)
