class Config:
    DEBUG = False

    SQLALCHEMY_DATABASE_URI = 'mssql+pyodbc://localhost/Road_Complaint_Forms?driver=ODBC+Driver+17+for+SQL+Server?trusted_connection=yes'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True

    SECRET_KEY = ''
    SQLALCHEMY_DATABASE_URI = 'mssql+pyodbc://localhost/Road_Complaint_Forms?driver=ODBC+Driver+17+for+SQL+Server?trusted_connection=yes'
    
# class ProductionConfig(Config):
#     #In the production environment these values are obtained from the environment variables
#     SECRET_KEY = os.environ.get('SECRET_KEY')

#     SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')