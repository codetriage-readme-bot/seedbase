import os
import sys
import unittest
import tempfile

# Append the parent directory so we can import app module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
import app

class HatchTestCase(unittest.TestCase):

  def setUp(self):
    self.db_fd, app.app.config['DATABASE'] = tempfile.mkstemp()
    app.app.config['TESTING'] = True
    self.app = app.app.test_client()
    with app.app.app_context():
      app.init_db()

  def tearDown(self):
    os.close(self.db_fd)
    os.unlink(app.app.config['DATABASE'])

if __name__ == '__main__':
  unittest.main()