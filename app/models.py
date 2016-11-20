from app import db
from datetime import datetime
from passlib.apps import custom_app_context as pwd_context


class User(db.Model):
  id            = db.Column(db.Integer, primary_key=True)
  name          = db.Column(db.String(80))
  email         = db.Column(db.String(120), unique=True, index=True)
  password_hash = db.Column(db.String(128))
  authenticated = db.Column(db.Boolean, default=False)
  created_at    = db.Column(db.DateTime)

  def __init__(self, name, email, created_at=None):
    self.name = name
    self.email = email
    if created_at is None:
      created_at = datetime.utcnow()

  def __repr__(self):
    return '<User %r>' % self.name

  def hash_password(self, password):
    self.password_hash = pwd_context.encrypt(password)

  def verify_password(self, password):
    return pwd_context.verify(password, self.password_hash)

  def get_id(self):
    return self.email

  def is_authenticated(self):
    return self.authenticated

  def is_active(self):
    return True

  def is_anonymous(self):
    return False

class Model(db.Model):
  id          = db.Column(db.Integer, primary_key=True)
  name        = db.Column(db.String(20))
  user_id     = db.Column(db.Integer, db.ForeignKey('user.id'))
  user        = db.relationship('User', backref=db.backref('models', lazy='dynamic'))
  created_at  = db.Column(db.DateTime)

  def __init__(self, name, user, created_at=None):
    self.name = name
    self.user = user
    if created_at is None:
      created_at = datetime.utcnow()

  def __repr__(self):
    return '<Model %r' % self.name

class CustomDataType(db.Model):
  id          = db.Column(db.Integer, primary_key=True)
  name        = db.Column(db.String(20))
  user_id     = db.Column(db.Integer, db.ForeignKey('user.id'))
  user        = db.relationship('User', backref=db.backref('custom_data_types', lazy='dynamic'))
  created_at  = db.Column(db.DateTime)

  def __init__(self, name, user, created_at=None):
    self.name = name
    self.user = user
    if created_at is None:
      created_at = datetime.utcnow()

  def __repr__(self):
    return '<CustomDataType %r>' % self.name