from flask import render_template, url_for, request, flash, redirect
from flask_restful import abort
from app import app, db
from app.models import User

@app.route('/')
def home():
  return render_template('home/home.html')

@app.route('/api/users', methods=['POST'])
def create_user():
  name = request.json.get('name')
  email = request.json.get('email')
  password = request.json.get('password')
  if name is None or email is None or password is None:
    abort(400)
  if User.query.filter_by(email=email).first() is not None:
    abort(400)
  user = User(name=name, email=email)
  user.hash_password(password)
  db.session.add(user)
  db.session.commit()
  return jsonify({ 'name': user.name, 'email': user.email }), 200, {'Location': url_for('get_user', id=user.id, _external=True)}

@app.route('/api/users/<int:id>')
def get_user(id):
  user = User.query.get(id)
  if not user:
    abort(400)
  return jsonify({ 'email': user.email })

@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.form:
    print(request.form)
  return render_template('/user/login.html', form=request.form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
  return render_template('/user/signup.html', form=request.form)

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