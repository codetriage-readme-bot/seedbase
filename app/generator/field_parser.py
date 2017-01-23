from collections import deque
from gen_string import get_random_string
from gen_boolean import get_random_boolean
from gen_number import get_random_integer

def create_dict(fields):
	""" Creates a dictionary out of user's model fields."""

	result = []
	parse_fields(fields, u'{\xa0}', result)
	result.append('}')

	result = parse_json(result)
	return result

def parse_fields(data, parent_node, result):
	"""Orders a list of keys for easier JSON construction

		This algorithm will take in a list of dictionaries and output a string
		representation of JSON. The algorithm finds all nested objects for the
		current element before proceeding with the rest of the list. This helps
		to create the JSON string. A queue is used to get these items and the
		algorithm will not continue until this queue is empty. The method is called
		recursively to get the nested children and returns when the queue is empty.

		Args:
			data (dict[]): An array of dictionaries representing model fields.
			parent_node: The top level string representation of JSON, in this
									 case denoted by curly braces '{ }'. However, they must
									 be escaped in Python.
	"""

	queue = deque([])
	result.append('{')

	while len(data) > 0:
		for ele in data:
			if ele['parent_node'] == parent_node:
				queue.append(ele)
				break

		if len(queue) == 0:
			return
		else:
			ele = queue.popleft()

		if ele['data_type'] == 'JSON Object':
			new_parent_node = ele['name']
			data.remove(ele)
			result.append(repr(str(ele['name'])))
			result.append(":")
			parse_fields(data, new_parent_node, result)
			result.append('}')
		else:
			data.remove(ele)
			result.append(repr(str(ele['name'])))
			result.append(":")
			if ele['data_type'] == 'Boolean':
				result.append(repr(str(get_random_boolean())))
			elif ele['data_type'] == 'Number':
				result.append(repr(str(get_random_integer())))
			elif ele['data_type'] == 'String':
				result.append(repr(str(get_random_string())))

def parse_json(result):
	return ''.join(result).replace('\'\'', '\',\'').replace('}\'', '},\'').replace('\'', '"')
