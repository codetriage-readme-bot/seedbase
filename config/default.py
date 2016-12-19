# This is the default configuration if HATCH_CONFIG is not set

# Define the application directory
import os
from dotenv import load_dotenv, find_dotenv

# Load dotenv for environment variables
load_dotenv(find_dotenv())

DEBUG = True

SECRET_KEY = os.environ.get("SECRET_KEY")

TEMPLATES_AUTO_RELOAD = True

PG_USERNAME = os.environ.get("PG_USERNAME")
PG_PASSWORD = os.environ.get("PG_PASSWORD")
PG_DATABASE = os.environ.get("PG_DATABASE")

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/' + PG_DATABASE