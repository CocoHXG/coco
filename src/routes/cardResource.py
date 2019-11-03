import falcon
from card_info import CARDS
import json

class CardResource(object):
    def on_get(self, req, resp):
        try:
            card_num = req.params["card_num"]
        except Exception:
            raise falcon.HTTPBadRequest()
        
        try:
            resp.body = json.dumps({
                "customer_id": CARDS[card_num][0],
                "sec_num": CARDS[card_num][1]
            })
        except KeyError:
            raise falcon.HTTPNotFound()
        resp.status = falcon.HTTP_200
        print(resp.body)
