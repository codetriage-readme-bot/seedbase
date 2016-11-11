from flask_restful import reqparse, abort, Resource

models = {
  'example_model_1': {'name': 'users'},
  'example_model_2': {'name': 'organizations'}
}

class Model(Resource):
  def get(self, model_id):
    return models[model_id]

  def put(self, model_id):
    args = parser.parse_args()
    model = {'name': args['name']}
    models[model_id] = model
    return model, 201

  def delete(self, model_id):
    del models[model_id]
    return '', 204

class ModelList(Resource):
  def get(self):
    return models

  def post(self):
    args = parser.parse_args()
    model_id = int(max(models.keys())).lstrip('model') + 1
    model_id = 'example_model_%i' % model_id
    models[model_id] = {'name': args['name']}
    return models[model_id], 201

