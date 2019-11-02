import falcon
import pandas as pd
from sklearn import tree
from customer_info import CUSTOMERS


class DecisionTree(object):
    def on_get(self, req, resp):
        print(req.query_string)
        try:
            customer_id = req.params["customer_id"]
            X_test = [[req.params["cost"], req.params["lat"], req.params["long"]]]
        except KeyError:
            raise falcon.HTTPBadRequest()
        
        rank = 0
        X = []
        Y = []
        prev_customer = None
        customer_rank = -1
        for row in CUSTOMERS:
            curr_customer = row[0]
            if curr_customer != prev_customer:
                customer_rank += 1
                X.append([0] + row[1: 3])
                Y.append(customer_rank)
            if curr_customer == customer_id:
                rank = customer_rank
            X.append(row[3: ])
            Y.append(customer_rank)
            prev_customer = row[0]
        
        
        
        clf = tree.DecisionTreeClassifier()
        clf = clf.fit(X, Y)
        y_pred = clf.predict(X_test)

        resp.status = falcon.HTTP_200
        print(y_pred)

        if Y[0] != y_pred:
            resp.status = falcon.HTTP_203
        print("SUCCESS")

app = application = falcon.API()
things = DecisionTree()

# things will handle all requests to the '/things' URL path
app.add_route('/things', things)
