from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import models, views

app.config.from_object('config')
app.config.from_envvar('HATCH_CONFIG', silent=True)

def initialize_api(app):
  from api import Model, ModelList
  api = Api(app, prefix='/api')
  api.add_resource(ModelList, '/models', endpoint='models')
  api.add_resource(Model, '/models/<int:id>', endpoint='model')
  return api