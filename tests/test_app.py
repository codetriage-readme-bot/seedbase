import os
import sys
import unittest
import tempfile

# Append the parent directory so we can import app module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
from app import app, db

class HatchTestCase(unittest.TestCase):

  def setUp(self):
    self.db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    self.app = app.test_client()

  def tearDown(self):
    os.close(self.db_fd)
    os.unlink(app.config['DATABASE'])

  def test_root_page(self):
    rv = self.app.get('/')
    assert b'Never manually create testing data again.' in rv.data

if __name__ == '__main__':
  unittest.main()