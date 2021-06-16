from models import db

class Forms(db.Model):
    __tablename__ = 'ComplaintForms'
    ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(50))
    Phone = db.Column(db.String(10))
    Email = db.Column(db.String(50))
    County = db.Column(db.String(50))
    RoadName = db.Column(db.String(100))
    MileMarker = db.Column(db.Float)
    Comments = db.Column(db.String(100))
    Path = db.Column(db.String(4000))
    # Image = db.Column(db.VARBINARY(max))

    def __repr__(self):
        return '<Form %s>' % self.Name

