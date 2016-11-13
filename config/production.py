# This is the production environment configuration

# Define the application directory
import os

DEBUG=False

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = CLEARDB_DATABASE_URL