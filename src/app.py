import falcon
import pandas as pd
from routes.cardResource import CardResource
from routes.decisionTreeResource import DecisionTree
from falcon_cors import CORS


cors = CORS(allow_all_origins=True)
app = application = falcon.API(middleware=[cors.middleware])

app.add_route('/activity', DecisionTree())
app.add_route('/cardNumber', CardResource())

