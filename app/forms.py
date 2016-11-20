from flask_wtf import FlaskForm
from wtforms import StringField, TextField, PasswordField, validators

class LoginForm(FlaskForm):
    email = TextField('email', [validators.Required()])
    password = PasswordField('password', [validators.Required()])

class SignupForm(FlaskForm):
    name = StringField('name', [validators.Required()])
    email = TextField('email', [validators.Required()])
    password = PasswordField('password', [validators.Required()])