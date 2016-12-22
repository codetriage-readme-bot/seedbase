# https://docs.python.org/2/library/random.html
import random

def get_random_integer(low=0, high=10):
	return random.randint(low, high)

def get_random_float(low=0, high=10):
	return random.uniform(low, high)