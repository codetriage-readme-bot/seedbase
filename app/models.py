from app import db
from datetime import datetime

class User(db.Model):
  id          = db.Column(db.Integer, primary_key=True)
  name        = db.Column(db.String(80))
  email       = db.Column(db.String(120), unique=True)
  created_at  = db.Column(db.DateTime)

  def __init__(self, name, email, created_at=None):
    self.name = name
    self.email = email
    if created_at is None:
      created_at = datetime.utcnow()

  def __repr__(self):
    return '<User %r>' % self.name

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