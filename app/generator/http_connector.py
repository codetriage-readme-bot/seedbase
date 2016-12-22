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

	def __init__(self, form):
		self.username = form.username.data
		self.password = form.password.data
		self.endpoint = form.endpoint.data
		self.model = form.model.data
		self.amount = form.amount.data

	def test_connection(self):
		data = json.dumps({"ticket": {"subject": "Testing", "description": "Just a test", "comment": { "body": "This is an epic test ticket." }, "priority": "urgent"}})
		headers = {'Content-Type': 'application/json'}
		r = requests.post(self.endpoint, auth=(self.username, self.password), data=data, headers=headers)
		print(r.json())