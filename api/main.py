#Made from this link: https://rahmanfadhil.com/flask-rest-api/
from flask import Flask, jsonify, request
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from marshmallow import Schema, fields
from sqlObjToJson import convert_sqlobj_json
from forms import forms_bp 
import models
import Schemas
import Resources

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(forms_bp)
    models.init_app(app)
    Schemas.init_app(app)
    Resources.init_app(app)
    return app

if __name__ == '__main__':
    app.run(debug=True)