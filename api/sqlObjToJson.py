import datetime
import decimal

def convert_sqlobj_json(obj):
    """Convert the result of the SQLAlchemy query to Json"""
    recs = []
    result = [d.__dict__ for d in obj]
    for r in result:
        recs.append(convert_one_sqlobj_json(r))
    return recs
 
def convert_one_sqlobj_json(r):
    while "_sa_instance_state" in r:
        r.pop("_sa_instance_state")
        for k, v in r.items():

            if isinstance(v, datetime.date):
                """ Date format """
                r[k] = v.isoformat()

            elif isinstance(v, str):
                """ Check for Double quotes, it break the Json format if don't replaced for '\\"' """
                if '"' in v:
                    r[k] = v.replace('"', '\\"')
                elif "\r\n" in v:
                    r[k] = v.replace("\r\n", "<br>")
            elif v == None:
                r[k] = ""
            elif isinstance(v, decimal.Decimal):
                r[k] = str(v)

        return r