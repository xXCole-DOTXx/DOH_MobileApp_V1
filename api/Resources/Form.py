from flask import request
from flask_restful import Resource
from http import HTTPStatus
from flask import jsonify
from models.Models import Forms
from Schemas.Form import FormSchema, form_schema, forms_schema
from marshmallow import ValidationError
from extensions import db
import boto3

class FormListResource(Resource):
    def get(self):
        #Get all users WITH Marshmallow
        forms = Forms.query.all()
        return forms_schema.dump(forms) #use forms_schema (plural) because we are getting all forms (multiple).

        #This is the approach WITHOUT Marshmallow
        # users = User.query.all()
        # data = jsonify(convert_sqlobj_json(users))
        # return data
    
    def post(self):
        json_data = request.get_json()

        #Create a new Form using Marshmallow
        new_form = Forms(
            Name=request.json['Name'],
            Phone=request.json['Phone'],
            Email=request.json['Email'],
            County=request.json['County'],
            RoadName=request.json['RoadName'],
            MileMarker=request.json['MileMarker'],
            Comments=request.json['Comments'],
            Path=request.json['Path'],
            #Image=request.json['Image']
        )
        db.session.add(new_form)
        db.session.commit()

        #s3 = boto3.client('s3')
        #s3.upload_file('C:/Users/e096752/Downloads/pothole1.jpg', 'rn-mobile-app-bucket', 'Uploaded Photos/9878798.png') #this does not work. The path variable isnt accepted

        return form_schema.dump(new_form)

    def delete(self):
        json_data = request.get_json()

        #Delete a user
        data = request.get_json()
        formID = request.json['ID']
        print(formID)
        form = Forms.query.get_or_404(formID)
        db.session.delete(form)
        db.session.commit()
        return 'Its done.', 204

class FormResource(Resource):
    #Get a user by ID
    def post(self):
        json_data = request.get_json()
        formID = request.json['ID']
        form = Forms.query.get_or_404(formID)
        return form_schema.dump(form)

    def patch(self):
        json_data = request.get_json()
        data = request.get_json()
        formID = request.json['ID']
        form = Forms.query.get_or_404(formID)

        if 'Name' in request.json:
            form.Name = request.json['Name']
        if 'Age' in request.json:
            form.Age = request.json['Age']

        db.session.commit()
        return form_schema.dump(form)