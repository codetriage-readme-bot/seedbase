import os
import sys
import unittest
from flask import Flask
from flask_testing import TestCase

# Append the parent directory so we can import app module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
from app import app, db

class HomeTest(TestCase):
  def create_app(self):
    app = Flask(__name__)
    app.config['TESTING'] = True
    return app

  def test_root_page(self):
    rv = self.client.get('/')
    print rv
    assert b'Never manually create testing data again.' in rv.data

if __name__ == '__main__':
  unittest.main()