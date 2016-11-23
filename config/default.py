# This is the default configuration if HATCH_CONFIG is not set

# Define the application directory
import os
from dotenv import load_dotenv, find_dotenv

# Load dotenv for environment variables
load_dotenv(find_dotenv())

DEBUG = True

SECRET_KEY = os.environ.get("SECRET_KEY")

TEMPLATES_AUTO_RELOAD = True

MYSQL_USERNAME = os.environ.get("MYSQL_USERNAME")
MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD")
MYSQL_DATABASE = os.environ.get("MYSQL_DATABASE")

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = 'mysql://' + MYSQL_USERNAME + ':' + MYSQL_PASSWORD + '@localhost/' + MYSQL_DATABASE