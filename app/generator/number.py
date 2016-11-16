# https://docs.python.org/2/library/random.html
import random

x = random.random() # Random float x, 0.0 <= x < 1.0
# => 0.3716198973948576

y = random.uniform(1, 10) # Random float y, 1.0 <= y < 10.0
# => 1.1800148434510981

z = random.randint(1, 10) # Integer from 1 to 10, endpoints included
# => 7

# random.randrange(start, stop[, step])
a = random.randrange(0, 101, 2) # Even integer from 0 to 100
# => 26

b = random.choice('abcdefghij') # Choose a random element
# => 'c'

items = [1, 2, 3, 4, 5, 6, 7]
c = random.shuffle(items)
# => [7, 3, 2, 5, 6, 4, 1]

random.sample([1, 2, 3, 4, 5], 3) # Choose 3 elements
# => [4, 1, 5]

"""
random.seed(a=None, version=2)
random.getstate()
random.setstate(state)
random.getrandbits(k)
...
random.betavariate(alpha, beta)
random.expovariate(lamd)
random.gammavariate(alpha, beta)
random.gauss(mu, sigma)
random.lognormvariate(mu, sigma)
random.normalvariate(mu, sigma)
random.vonmisesvariate(mu, kappa)
random.paretovariate(alpha)
random.weibullvariate(alpha, beta)
"""

# Need a formatter class