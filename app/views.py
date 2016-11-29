from flask import render_template, url_for, request, flash, redirect, jsonify, abort
from flask_login import login_user, login_required, logout_user, current_user
from forms import SignupForm, LoginForm, flash_errors
from urlparse import urlparse, urljoin
from app import app, db, login_manager, api
from app.models import User

@login_manager.user_loader
def load_user(email):
  return User.query.filter_by(email=email).first()

def is_safe_url(target):
  ref_url = urlparse(request.host_url)
  test_url = urlparse(urljoin(request.host_url, target))
  return test_url.scheme in ('http', 'https') and \
    ref_url.netloc == test_url.netloc

@app.route('/')
def home():
  return render_template('home/home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
  form = LoginForm()
  if request.method == 'POST' and form.validate_on_submit():
    user = User.query.filter_by(email=form.email.data).first()

    if user and user.verify_password(form.password.data):
      login_user(user)
      flash('Welcome back, %s.' % user.name, category='success')

      next = request.args.get('next')

      if not is_safe_url(next):
        return abort(400)

      return redirect(next or url_for('models'))
    else:
      flash("The username or password you have entered is invalid.", category="danger")
  else:
    flash_errors(form)
  return render_template('/user/login.html', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
  form = SignupForm()
  if request.method == 'POST' and form.validate_on_submit():
    user = User(form.name.data, form.email.data)
    user.hash_password(form.password.data)

    if not User.query.filter_by(email=user.email).count():
      db.session.add(user)
      db.session.commit()
      login_user(user)
      flash("You've successfully signed up!", category="success")

      next = request.args.get('next')

      if not is_safe_url(next):
        return abort(400)

      return redirect(next or url_for('models'))
    else:
      flash("That email is already taken by another user.", category="danger")
  else:
    flash_errors(form)
  return render_template('/user/signup.html', form=form)

@app.route("/logout")
@login_required
def logout():
  logout_user()
  flash("You've been logged out.", category="info")
  return redirect(url_for('models'))

@app.route('/generator/data-types', methods=['GET', 'POST'])
def data_types():
  return render_template('generator/data-types.html')

@app.route('/generator/models', methods=['GET', 'POST'])
def models():
  if request.method == 'POST':
    # Handle POST
    pass
  return render_template('generator/models.html')

@app.route('/generator/connector', methods=['GET', 'POST'])
def connector():
  return render_template('generator/connector.html')

@app.route('/docs')
def docs():
  return render_template('docs/docs.html')