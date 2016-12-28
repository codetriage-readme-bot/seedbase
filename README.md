Seedbase.io
===========

A data generation platform with a RESTful API connector. Follow the [Trello Board](https://trello.com/b/8zS0QPeR/seedbase) for the product roadmap and visit the [wiki](https://github.com/rosendin/seedbase/wiki) for further reading.

## Development

The Seedbase tech stack consists of a Python back-end on the Flask microframework and a ReactJS front-end.

### Getting Started

Clone the repository:
```
$ git clone https://github.com/rosendin/seedbase.git
```

Create a virtual environment:
```
$ virtualenv env
```

Activate the environment by sourcing the activate script:
```
$ . bin/env/activate
```

Install Python requirements:
```
(env) $ pip install -r requirements.txt
```

Install NPM development modules:
```
(env) $ npm install
```

Export the `FLASK_APP` environment variable and run the application:
```
(env) $ export FLASK_APP=run.py
(env) $ python run.py
```

You may have to restart your shell after exporting the environment variable. Also add a `.env` file to the application root and set values for `MYSQL_USERNAME`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, and `SECRET_KEY`.

Make sure the database is created. Then enter the python (`python`) and run the following to create the database tables:

``` python
from app import db
db.create_all()
```

### Testing

Run the test suite:
```
(env) $ python -m unittest discover
```

### Database Migrations

#### Locally

```
(env) $ flask db migrate
(env) $ flask db upgrade
```