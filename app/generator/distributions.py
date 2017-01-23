"""
This file will contain methods for creating various distributions for the
generator API.

Use https://docs.python.org/2/library/random.html for reference:

  - random.uniform(a, b)
        Return a random floating point number N such that a <= N <= b for
        a <= b and b <= N <= a for b < a.

  - random.betavariate(alpha, beta)
        Beta distribution. Conditions on the parameters are alpha > 0 and
        beta > 0. Returned values range between 0 and 1.

  - random.expovariate(lambd)
        Exponential distribution. lambd is 1.0 divided by the desired mean.
        It should be nonzero. (The parameter would be called “lambda”, but that
        is a reserved word in Python.) Returned values range from 0 to positive
        infinity if lambd is positive, and from negative infinity to 0 if lambd
        is negative.

  - random.gammavariate(alpha, beta)
        Gamma distribution. (Not the gamma function!) Conditions on the
        parameters are alpha > 0 and beta > 0.

  - random.gauss(mu, sigma)
        Gaussian distribution. mu is the mean, and sigma is the standard
        deviation. This is slightly faster than the normalvariate() function
        defined below.

  - random.lognormvariate(mu, sigma)
        Log normal distribution. If you take the natural logarithm of this
        distribution, you’ll get a normal distribution with mean mu and standard
        deviation sigma. mu can have any value, and sigma must be greater than
        zero.

  - random.normalvariate(mu, sigma)
        Normal distribution. mu is the mean, and sigma is the standard
        deviation.

  - random.paretovariate(alpha)
        Pareto distribution. alpha is the shape parameter.

  - random.weibullvariate(alpha, beta)
        Weibull distribution. alpha is the scale parameter and beta is the shape
        parameter.
"""

import random
