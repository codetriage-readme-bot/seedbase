# Hatch

A data generation platform for emulating production data.

## Development

The Hatch tech stack consists of a Python back-end on the Flask microframework and a ReactJS front-end.

### Getting Started

Clone the repository:
```
$ git clone https://github.com/rosendin/hatch.git
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

Install ReactJS with bower:
```
(env) $ bower install
```

Run the gulpfile:
```
(env) $ gulp gulpfile
```

Export the `FLASK_APP` environment variable and run the application:
```
(env) $ export FLASK_APP=run.py
(env) $ python run.py
```

### Database Migrations

```
(env) $ flask db migrate
(env) $ flask db upgrade
```