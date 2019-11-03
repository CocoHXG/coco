import falcon
from customer_info import CUSTOMERS
from sklearn import tree
import numpy as np
import scipy

class DecisionTree(object):
    def on_get(self, req, resp):
        print(req.query_string)
        try:
            customer_id = req.params["customer_id"]
            X_test = [[req.params["lat"], req.params["long"]]]
            cost = req.params["cost"]
        except KeyError:
            raise falcon.HTTPBadRequest()
        
        rank = 0
        X = []
        Y = []
        prices = []
        prev_customer = None
        customer_rank = -1
        for row in CUSTOMERS:
            curr_customer = row[0]
            if curr_customer != prev_customer:
                customer_rank += 1
                prices.append([])
                X.append(row[1: 3])
                Y.append(customer_rank)
            if curr_customer == customer_id:
                rank = customer_rank
            prices[customer_rank].append(row[3])
            X.append(row[4: ])
            Y.append(customer_rank)
            prev_customer = row[0]
        
        # CHECKS LOCATION IS GOOD
        clf = tree.DecisionTreeClassifier()
        clf = clf.fit(X, Y)
        y_pred = clf.predict(X_test)

        # CHECKS PRICES SD
        a = 1.0 * np.array(prices[rank])
        n = len(a)
        m, se = np.mean(a), scipy.stats.sem(a)
        h = se * scipy.stats.t.ppf((1.99) / 2., n-1)

        resp.status = falcon.HTTP_200
        resp.body = '{"message": "Good activity!"}'

        if rank != y_pred[0] or not (int(cost) < m+h):
            resp.body = '{"message": "Suspect fraudulent activity!"}'