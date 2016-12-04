from flask import jsonify, request
from functools import wraps
from flask_login import login_required, current_user
from app import app, db
from app.models import User, Model, CustomDataType, ModelSchema, CustomDataTypeSchema

def requires_auth(f):
  """This is a decorator for API routes to check authentication

  The decorator wraps around an API route and runs the verify_request_authorization
  method. If the user has provided a correct basic auth header or the user is already
  logged in, the API route will run. Else, the user is asked to authenticate.
  """
  @wraps(f)
  def verify_request_authorization(*args, **kwargs):
    auth = request.authorization
    if not auth or not check_auth(auth.username, auth.password):
      if not current_user.is_authenticated:
        return needs_authentication()
    return f(*args, **kwargs)
  return verify_request_authorization

def needs_authentication():
  """Sends a 401 response"""
  return jsonify({"error": "Could not authenticate user."}), 401

def check_auth(username, password):
  """This method is called to check if a username /
  password combination is valid.
  """
  user = User.query.filter_by(email = username).first()
  return user and user.verify_password(password)

def get_user(request):
  """This method returns the current user based on basic auth in a request
  or from the session information if the user is logged in."""
  if request.authorization:
    return User.query.filter_by(email = request.authorization.username).first()
  elif current_user.is_authenticated:
    return current_user

# MODELS ============================================================

@app.route('/api/models', methods=['GET'])
@requires_auth
def get_models():
  user = get_user(request)
  models = Model.query.filter_by(user = user).all()
  return jsonify(ModelSchema().dump(models, many=True).data), 200

@app.route('/api/models/<int:model_id>', methods=['GET'])
@requires_auth
def get_model(model_id):
  user = get_user(request)
  model = user.models.filter(Model.id == model_id)
  return jsonify(ModelSchema().dump(model).data), 200

@app.route('/api/models', methods=['POST'])
@requires_auth
def create_model():
  user = get_user(request)
  model = Model(name=request.get_json()['name'], user=user)
  db.session.add(model)
  db.session.commit()
  query = Model.query.get(model.id)
  return jsonify(ModelSchema().dump(query).data), 201

@app.route('/api/models/<int:model_id>', methods=['PUT'])
@requires_auth
def update_model(model_id):
  pass

@app.route('/api/models/<int:model_id>', methods=['DELETE'])
@requires_auth
def delete_model(model_id):
  pass

# CUSTOM DATA TYPES =================================================

@app.route('/api/custom_data_types', methods=['GET'])
@requires_auth
def get_custom_data_types():
  pass

@app.route('/api/custom_data_types/<int:custom_data_type_id>', methods=['GET'])
@requires_auth
def get_custom_data_type(custom_data_type_id):
  pass

@app.route('/api/custom_data_types', methods=['POST'])
@requires_auth
def create_custom_data_type():
  pass

@app.route('/api/custom_data_types/<int:custom_data_type_id>', methods=['PUT'])
@requires_auth
def update_custom_data_type(custom_data_type_id):
  pass

@app.route('/api/custom_data_types/<int:custom_data_type_id>', methods=['DELETE'])
@requires_auth
def delete_custom_data_type(custom_data_type_id):
  pass