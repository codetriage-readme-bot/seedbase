from flask import jsonify
from flask_restful import reqparse, abort, Resource

models = {
  'example_model_1': {'name': 'users'},
  'example_model_2': {'name': 'organizations'}
}

class Model(Resource):
  def get(self, model_id):
    return jsonify(models[model_id])

  def put(self, model_id):
    args = parser.parse_args()
    model = {'name': args['name']}
    models[model_id] = model
    return jsonify(model)

  def delete(self, model_id):
    del models[model_id]
    return jsonify({})

class ModelList(Resource):
  def get(self):
    return jsonify(models)

  def post(self):
    args = parser.parse_args()
    model_id = int(max(models.keys())).lstrip('model') + 1
    model_id = 'example_model_%i' % model_id
    models[model_id] = {'name': args['name']}
    return jsonify(models[model_id])

