from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.config.from_object('config.default')
app.config.from_envvar('HATCH_CONFIG', silent=True)

login_manager = LoginManager()
login_manager.init_app(app)

from app import models, views