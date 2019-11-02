import falcon
from sklearn import tree

class DecisionTree(object):
    def on_get(self, req, resp):
        customer_id = req.media
        print(customer_id)
        resp.status = falcon.HTTP_200
        resp.body = customer_id
        # X = [[0, 0], [1, 1]]
        # Y = [0, 1]
        # clf = tree.DecisionTreeClassifier()
        # clf = clf.fit(X, Y)
        # print("ENTERED")

app = application = falcon.API()
things = DecisionTree()

# things will handle all requests to the '/things' URL path
app.add_route('/things', things)