from flask import jsonify, make_response
from flask.ext.httpauth import HTTPBasicAuth
from flask_restful import reqparse, abort, Resource

models = {
  'example_model_1': {'name': 'users'},
  'example_model_2': {'name': 'organizations'}
}

auth = HTTPBasicAuth()

@auth.get_password
def get_password(email):
  # To do: check the user table for given the email
  if email == 'joe@example.com':
    return 'password'
  return None

@auth.error_handler
def unauthorized():
  return make_response(jsonify({'error': 'Unauthorized access'}), 401)

class Model(Resource):
  decorators = [auth.login_required]

  def get(self, id):
    return jsonify(models['id'])

  def put(self, id):
    args = parser.parse_args()
    model = {'name': args['name']}
    models['id'] = model
    return jsonify(model)

  def delete(self, id):
    del models['id']
    return jsonify({})

class ModelList(Resource):
  decorators = [auth.login_required]

  def get(self):
    return jsonify(models)

  def post(self):
    args = parser.parse_args()
    model_id = int(max(models.keys())).lstrip('model') + 1
    model_id = 'example_model_%i' % model_id
    models[model_id] = {'name': args['name']}
    return jsonify(models[model_id])

