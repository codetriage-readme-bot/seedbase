from flask import flash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import Length, Email, InputRequired, EqualTo

def flash_errors(form):
  for field, errors in form.errors.items():
    for error in errors:
      flash("Error in the %s field - %s" % (getattr(form, field).label.text, error), category="danger")

class LoginForm(FlaskForm):
    email = StringField('email', [InputRequired(), Email()])
    password = PasswordField('password', [InputRequired()])

class SignupForm(FlaskForm):
    name = StringField('name', [Length(min=4, max=35)])
    email = StringField('email', [Email()])
    password = PasswordField('password', [Length(min=6, max=35)])
    confirmation = PasswordField('confirmation', [InputRequired(), EqualTo('password', message='Passwords must match.')])