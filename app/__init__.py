from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app)

from app import models, views

app.config.from_object('config')

def initialize_api(app):
  from api import Model, ModelList
  api = Api(app, prefix='/api')
  api.add_resource(ModelList, '/models')
  api.add_resource(Model, '/models/<model_id>')
  return api