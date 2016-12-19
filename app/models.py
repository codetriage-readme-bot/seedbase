#!/usr/bin/env python
# coding: utf-8
"""
This file lists all models for the Seedbase web application. Some references that may be useful:
- http://docs.sqlalchemy.org/en/latest/orm/inheritance.html

:copyright: 2016 by Seedbase
"""

from app import db, ma
from datetime import datetime
from marshmallow_sqlalchemy import ModelSchema
from marshmallow import fields
from sqlalchemy.dialects.postgresql import ARRAY, HSTORE
from passlib.apps import custom_app_context as pwd_context


class User(db.Model):
  """ A basic user model that meets the criteria for use with Flask-Login """
  __tablename__    = 'user'
  id               = db.Column(db.Integer, primary_key=True)
  name             = db.Column(db.String(80))
  email            = db.Column(db.String(120), unique=True, index=True)
  password_hash    = db.Column(db.String(128))
  is_authenticated = db.Column(db.Boolean)
  is_active        = db.Column(db.Boolean)
  is_anonymous     = db.Column(db.Boolean)
  created_at       = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at       = db.Column(db.DateTime)

  def __init__(self, name, email):
    self.name = name
    self.email = email
    self.is_authenticated = True
    self.is_active = True
    self.is_anonymous = False
    self.updated_at = datetime.utcnow()

  def __repr__(self):
    return '<User %r>' % self.name

  def hash_password(self, password):
    self.password_hash = pwd_context.encrypt(password)

  def verify_password(self, password):
    return pwd_context.verify(password, self.password_hash)

  def get_id(self):
    return self.email

class Model(db.Model):
  """ A representation of a model that a user can construct in a JSON format """

  __tablename__ = 'model'
  id            = db.Column(db.Integer, primary_key=True)
  name          = db.Column(db.String(50))
  fields        = db.Column(ARRAY(HSTORE), default=[])
  user_id       = db.Column(db.Integer, db.ForeignKey('user.id'))
  user          = db.relationship('User', backref=db.backref('models', lazy='dynamic'))
  created_at    = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at    = db.Column(db.DateTime)

  def __init__(self, name, user):
    self.name = name
    self.user = user
    self.updated_at = datetime.utcnow()

  def __repr__(self):
    return '<Model %r>' % self.name

class NativeDataType(db.Model):
  """ A base class for representing different data types """
  __tablename__   = 'native_data_type'
  id              = db.Column(db.Integer, primary_key=True)
  name            = db.Column(db.String(50))
  type            = db.Column(db.String(50))
  __mapper_args__ = { 'polymorphic_on': type,
                      'polymorphic_identity': 'native_data_type' }

  def __init__(self, name):
    self.name = name

  def __repr__(self):
    return '<NativeDataType %r>' % self.name

class CustomDataType(NativeDataType):
  """ A representation of different user-created data types that inherits from NativeDataType """
  __tablename__         = 'custom_data_type'
  __mapper_args__       = { 'polymorphic_identity': 'custom_data_type' }
  id                    = db.Column(db.Integer, db.ForeignKey('native_data_type.id'), primary_key=True)
  name                  = db.Column(db.String(50))
  user_id               = db.Column(db.Integer, db.ForeignKey('user.id'))
  user                  = db.relationship('User', backref=db.backref('custom_data_types', lazy='dynamic'))
  created_at            = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at            = db.Column(db.DateTime)

  def __init__(self, name, user):
    self.name = name
    self.user = user
    self.updated_at = datetime.utcnow()

  def __repr__(self):
    return '<CustomDataType %r>' % self.name

class ModelSchema(ma.ModelSchema):
  """ Define Model output with marshmallow """

  class Meta:
    model = Model

class CustomDataTypeSchema(ma.ModelSchema):
  """ Define Custom Data Type output with marshmallow """
  class Meta:
    model = CustomDataType
