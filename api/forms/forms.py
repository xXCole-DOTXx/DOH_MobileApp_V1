from flask import Blueprint
import boto3


forms_bp = Blueprint('forms', __name__)

@forms_bp.route('/formList')
def listForms():
    #s3 = boto3.client('s3')
    #s3.download_file('rn-mobile-app-bucket', 'Uploaded Photos/NicolBolas.jpg', 'C:/Users/e096752/Downloads/bolas.jpg')
    #s3.upload_file('C:/Users/e096752/Downloads/test.png', 'rn-mobile-app-bucket', 'Uploaded Photos/test.png')
    return "list alll"



