"""
An improvement on generating strings would be to use real words. More research
needs to be done on API services for words or sentences.
"""

import strgen

def get_random_string():
	return strgen.StringGenerator("[\d\w]{10}").render()
