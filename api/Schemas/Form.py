from marshmallow import Schema, fields
from models.Models import Forms
from Schemas import ma

class FormSchema(ma.Schema):
    class Meta:
        fields = ("ID", "Name", "Phone", "Email", "County", "RoadName", "MileMarker", "Comments", "Path")
        model = Forms
        
form_schema = FormSchema()
forms_schema = FormSchema(many=True)