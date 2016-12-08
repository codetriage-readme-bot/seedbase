Hatch
=====

A data generation platform for emulating production data. Follow the [Trello Board](https://trello.com/b/8zS0QPeR/hatch) for the product roadmap and visit the [wiki](https://github.com/rosendin/hatch/wiki) for further reading.

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

Export the `FLASK_APP` environment variable and run the application:
```
(env) $ export FLASK_APP=run.py
(env) $ python run.py
```

### Database Migrations

#### Locally

```
(env) $ flask db migrate
(env) $ flask db upgrade
```

#### Heroku

```
(env) $ heroku run flask db upgrade
```

### Other Useful Commands

SSH into Heroku
```
(env) $ heroku run bash
```