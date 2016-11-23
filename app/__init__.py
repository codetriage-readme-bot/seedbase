from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
import os

app = Flask(__name__)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.config.from_object(os.environ['HATCH_CONFIG'])

login_manager = LoginManager()
login_manager.init_app(app)

from app import models, views