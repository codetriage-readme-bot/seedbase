from flask import render_template, url_for, request, flash, redirect
from flask_restful import abort
from forms import SignupForm, LoginForm, flash_errors
from app import app, db
from app.models import User

@app.route('/')
def home():
  return render_template('home/home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
  form = LoginForm()
  if request.method == 'POST' and form.validate_on_submit():
    flash("Form looks good!", category="success")
  else:
    flash_errors(form)
  return render_template('/user/login.html', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
  form = SignupForm()
  if request.method == 'POST' and form.validate_on_submit():
    flash("Form looks good!", category="success")
  else:
    flash_errors(form)
  return render_template('/user/signup.html', form=form)

@app.route('/generator/data-types', methods=['GET', 'POST'])
def data_types():
  return render_template('generator/data-types.html')

@app.route('/generator/schema', methods=['GET', 'POST'])
def schema():
  return render_template('generator/schema.html')

@app.route('/generator/connector', methods=['GET', 'POST'])
def connector():
  return render_template('generator/connector.html')

@app.route('/docs')
def docs():
  return render_template('docs/docs.html')