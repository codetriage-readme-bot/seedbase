from flask import jsonify, request, g
from functools import wraps
from flask_login import login_required, current_user
from app import app, db
from app.models import User, Model, CustomDataType, ModelSchema, CustomDataTypeSchema
import sqlalchemy.exc

def requires_auth(f):
  """This is a decorator for API routes to check authentication

  The decorator wraps around an API route and runs the decorated
  method. If the user has provided a correct basic auth header or the user is already
  logged in, the API route will run. Else, the user is asked to authenticate.
  """
  @wraps(f)
  def decorated(*args, **kwargs):
    auth = request.authorization
    if not auth:
      if current_user.is_authenticated:
        g.user = current_user
        return f(*args, **kwargs)
      else:
        return needs_authentication()
    if user is None or user.password is not user.verify_password(auth.password):
      return needs_authentication()
    g.user = user
    return f(*args, **kwargs)
  return decorated

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
  try:
    fields = []

    for field in request.get_json()['fields']:
      fields.append({
        'id': str(field['id']),
        'name': str(field['name']),
        'data_type': str(field['data_type']),
        'parent_node': str(field['parent_node']) if 'parent_node' in field else None
      })

    model = Model(name=request.get_json()['name'], fields=fields, user=user)
    db.session.add(model)
    db.session.commit()
    query = Model.query.get(model.id)
    return jsonify(ModelSchema().dump(query).data), 201
  except sqlalchemy.exc.SQLAlchemyError as e:
    db.session.rollback()
    return jsonify({"error": str(e)}), 401

@app.route('/api/models/<int:model_id>', methods=['PUT'])
@requires_auth
def update_model(model_id):
  user = get_user(request)
  try:
    model = user.models.filter(Model.id == model_id).first()
    for key, value in request.get_json().items():
      setattr(model, key, value)
    db.session.add(model)
    db.session.commit()
    return jsonify(ModelSchema().dump(model).data, 200)
  except sqlalchemy.exc.SQLAlchemyError as e:
    db.session.rollback()
    return jsonify({"error": str(e)}), 401

@app.route('/api/models/<int:model_id>', methods=['DELETE'])
@requires_auth
def delete_model(model_id):
  user = get_user(request)
  try:
    model = user.models.filter(Model.id == model_id).first()
    db.session.delete(model)
    db.session.commit()
    return jsonify({}), 204
  except sqlalchemy.exc.SQLAlchemyError as e:
    db.session.rollback()
    return jsonify({"error": str(e)}), 401

# CUSTOM DATA TYPES =================================================

@app.route('/api/custom-data-types', methods=['GET'])
@requires_auth
def get_custom_data_types():
  user = get_user(request)
  cdts = CustomDataType.query.filter_by(user = user).all()
  return jsonify(CustomDataTypeSchema().dump(cdts, many=True).data), 200

@app.route('/api/custom-data-types/<int:custom_data_type_id>', methods=['GET'])
@requires_auth
def get_custom_data_type(custom_data_type_id):
  user = get_user(request)
  cdt = user.custom_data_types.filter(CustomDataType.id == custom_data_type_id)
  return jsonify(CustomDataTypeSchema().dump(cdt).data), 200

@app.route('/api/custom-data-types', methods=['POST'])
@requires_auth
def create_custom_data_type():
  user = get_user(request)
  try:
    cdt = CustomDataType(name=request.get_json()['name'], user=user)
    db.session.add(cdt)
    db.session.commit()
    query = CustomDataType.query.get(cdt.id)
    return jsonify(CustomDataTypeSchema().dump(query).data), 201
  except sqlalchemy.exc.SQLAlchemyError as e:
    db.session.rollback()
    return jsonify({"error": str(e)}), 401

@app.route('/api/custom-data-types/<int:custom_data_type_id>', methods=['PUT'])
@requires_auth
def update_custom_data_type(custom_data_type_id):
  user = get_user(request)
  try:
    cdt = user.custom_data_types.filter(CustomDataType.id == custom_data_type_id).first()
    for key, value in request.get_json().items():
      setattr(cdt, key, value)
    db.session.add(cdt)
    db.session.commit()
    return jsonify(CustomDataTypeSchema().dump(cdt).data, 200)
  except sqlalchemy.exc.SQLAlchemyError as e:
    db.session.rollback()
    return jsonify({"error": str(e)}), 401

@app.route('/api/custom-data-types/<int:custom_data_type_id>', methods=['DELETE'])
@requires_auth
def delete_custom_data_type(custom_data_type_id):
  user = get_user(request)
  try:
    cdt = user.custom_data_types.filter(CustomDataType.id == custom_data_type_id).first()
    db.session.delete(cdt)
    db.session.commit()
    return jsonify({}), 204
  except sqlalchemy.exc.SQLAlchemyError as e:
    db.session.rollback()
    return jsonify({"error": str(e)}), 401
