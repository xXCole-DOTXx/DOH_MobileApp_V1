from flask import Blueprint

forms_bp = Blueprint('forms', __name__)

@forms_bp.route('/formList')
def listForms():
    return "list alll"



