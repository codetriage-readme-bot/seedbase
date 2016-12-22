# This is the production environment configuration

# Define the application directory
import os

DEBUG=False

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
SECRET_KEY = os.environ['SECRET_KEY']
WTF_CSRF_CHECK_DEFAULT = False