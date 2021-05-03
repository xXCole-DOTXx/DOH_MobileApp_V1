from flask_restful import Api
from Resources.Form import FormListResource
from Resources.Form import FormResource

api = Api()

def init_app(app):
    api.init_app(app)
    

api.add_resource(FormListResource, '/forms')
api.add_resource(FormResource, '/form')
    