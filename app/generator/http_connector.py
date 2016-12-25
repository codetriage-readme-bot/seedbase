from field_parser import create_dict
import gen_boolean, gen_number, gen_string
import requests
import json

class HTTPConnector(object):
	"""Exceptions are documented in the same way as classes.

	A connector class to build POST requests to cross-domain APIs.

	Args:
		username (str): The username for basic authentication.
		password (str): The password for basic authentication.
		endpoint (str): The URL endpoint of a the RESTful API.
		model (obj): The Seedbase user's model object.
		amount (int): The amount of records to create.

	"""

	def __init__(self, form, current_user):
		self.username = form.username.data
		self.password = form.password.data
		self.endpoint = form.endpoint.data
		self.model_id = form.model.data
		self.amount = form.amount.data
		self.user = current_user

	def test_connection(self):
		"""Test a POST request using form data"""

		model = self.user.models.filter_by(id = self.model_id).one()

		# Convert model.fields into a JSON payload
		payload = self.create_json(model.fields)

		headers = {'Content-Type': 'application/json'}
		r = requests.post(self.endpoint, auth=(self.username, self.password), data=payload, headers=headers)
		print(r.json())

	def create_json(self, fields):
		"""Convert an array of fields to a JSON payload using a
			 topological sorting algorithm

		Args:
			fields (dict[]): A given model's fields
		Returns:
			json_data (dict): A dict properly formatted as JSON

		"""

		field_list = [f.__dict__ for f in fields]
		json_data = create_dict(field_list)

		return json_data

	def post_record(self):
		"""Sends a POST request using the form data and returns
		the response

		Returns:
			response (dict): The JSON response from the server
		"""

		model = self.user.models.filter_by(id = self.model_id).one()

		# Convert model.fields into a JSON payload
		payload = self.create_json(model.fields)

		headers = {'Content-Type': 'application/json'}
		r = requests.post(self.endpoint, auth=(self.username, self.password), data=payload, headers=headers)
		return r
