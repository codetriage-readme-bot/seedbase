from flask import jsonify
from flask_login import login_required, current_user
from app import app, db
from app.models import User, Model, CustomDataType, ModelSchema, CustomDataTypeSchema

# MODELS ============================================================

@app.route('/api/models', methods=['GET'])
def get_models():
  models = Model.query.filter_by(user = current_user).all()
  return jsonify(ModelSchema().dump(models).data), 200

@app.route('/api/models/<int:model_id>', methods=['GET'])
def get_model(model_id):
  model = Model.query.get(model_id)
  return jsonify(ModelSchema().dump(model).data), 200

@app.route('/api/models', methods=['POST'])
def create_model():
  pass

@app.route('/api/models/<int:model_id>', methods=['PUT'])
def update_model(model_id):
  pass

@app.route('/api/models/<int:model_id>', methods=['DELETE'])
def delete_model(model_id):
  pass

# CUSTOM DATA TYPES =================================================

@app.route('/api/custom_data_types', methods=['GET'])
def get_custom_data_types():
  pass

@app.route('/api/custom_data_types/<int:custom_data_type_id>', methods=['GET'])
def get_custom_data_type(custom_data_type_id):
  pass

@app.route('/api/custom_data_types', methods=['POST'])
def create_custom_data_type():
  pass

@app.route('/api/custom_data_types/<int:custom_data_type_id>', methods=['PUT'])
def update_custom_data_type(custom_data_type_id):
  pass

@app.route('/api/custom_data_types/<int:custom_data_type_id>', methods=['DELETE'])
def delete_custom_data_type(custom_data_type_id):
  pass