Seedbase.io
===========

[![Code Triagers Badge](https://www.codetriage.com/rosendin/seedbase/badges/users.svg)](https://www.codetriage.com/rosendin/seedbase)

A data generation platform with a RESTful API connector built on Python, Flask, React, and PostgreSQL. Designed to test APIs by generating random data and POSTing to endpoints. Follow the [Trello Board](https://trello.com/b/8zS0QPeR/seedbase) for the product roadmap and visit the [wiki](https://github.com/rosendin/seedbase/wiki) for further reading.

## Development

The Seedbase tech stack consists of a Python back-end on the Flask microframework and a ReactJS front-end.

### Getting Started

Clone the repository:
```
$ git clone https://github.com/rosendin/seedbase.git
```

Then `cd seedbase` and create a virtual environment:
```
$ virtualenv env
```

Activate the environment by sourcing the activate script:
```
$ . env/bin/activate
```

Install Python requirements:
```
(env) $ pip install -r requirements.txt
```

Install NPM development modules:
```
(env) $ npm install
```

Export the `SEEDBASE_CONFIG` environment variable (You may have to restart your shell after exporting the environment variable):
```
(env) $ export SEEDBASE_CONFIG=config.default
```

Also add a `.env` file to the application root and set values for `PG_USERNAME`, `PG_PASSWORD`, `PG_DATABASE`, and `SECRET_KEY`. Make sure to have PostgreSQL installed on your system. You can just set `PG_USERNAME=root` and the other values to empty strings if you want to setup the database later.

Finally, run the application:
```
(env) $ python run.py
```

### Database
Make sure the database is created in PostgreSQL. Then enter the python interpreter (`python`) and run the following to create the database tables:

``` python
from app import db
db.create_all()
```

### Database Migrations

```
(env) $ flask db migrate
(env) $ flask db upgrade
```

### Testing

Run the test suite:
```
(env) $ python -m unittest discover
```
