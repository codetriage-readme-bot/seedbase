import strgen

def generate_random_string():
	return strgen.StringGenerator("[\d\w]{10}").render()