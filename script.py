# install the requests package using 'python -m pip install requests'
import json
from collections import namedtuple
import requests
import random
apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiZjZhZWQyMTEtZTk5YS0zNjE2LThmZTAtYmYxZmE0YmRiNWMzIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiJmNGFhMjZlYS04Yzk3LTQzOGYtOWQyYy1lODMzZTM4NDFhNTYifQ.MpK7XJ_B482aLh6J04-iafgindgH21GZ2rEtsdSsuLA'
start = 'https://api.td-davinci.com/api/'

customers = requests.post(
    start + 'raw-customer-data',
    headers = { 'Authorization': apiKey},
    json = { 'continuationToken': '' }
).json()['result']['customers']

Location = namedtuple("Location", "lat long")

customer_info = []
card_info = {}
for customer in customers:
    if random.random() < .1:
        transactions = requests.get(
            start + 'customers/' + customer["id"] + '/transactions', 
            headers = { 'Authorization': apiKey},
            json = { 'continuationToken': '' }
        ).json()['result']

        current_info = []
        for transaction in transactions:
            if "locationLatitude" in transaction:
                current_info.append([
                    customer["id"],
                    customer["addresses"]["principalResidence"]["latitude"],
                    customer["addresses"]["principalResidence"]["longitude"],
                    transaction["currencyAmount"], 
                    transaction["locationLatitude"], 
                    transaction["locationLongitude"]])
        
        customer_info.extend(current_info[-50:])


        credit_cards = requests.get(
            start + 'customers/' + customer["id"] + '/accounts', 
            headers = { 'Authorization': apiKey},
            json = { 'continuationToken': '' }
        ).json()['result']['creditCardAccounts']

        card_info["123456789"] = customer["id"], "000"
        for credit_card in credit_cards:
            card_info[credit_card['card']['maskedNumber']] = customer["id"], credit_card['card']['securityCode']

with open('customer_info.py', 'w') as outfile:
    json.dump(customer_info, outfile)

with open('card_info.py', 'w') as outfile:
    json.dump(card_info, outfile)
