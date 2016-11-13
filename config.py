# Define the application directory
import os
from dotenv import load_dotenv

# Load dotenv for environment variables
dotenv_path = os.join(os.dirname(__file__), '.env')
load_dotenv(dotenv_path)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = 'mysql://username:password@localhost/db_name'