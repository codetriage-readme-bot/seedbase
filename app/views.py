from flask import render_template
from app import app

@app.route('/')
def home():
    return render_template('home/home.html')

@app.route('/generator/data-types')
def data_types():
    return render_template('generator/data-types.html')

@app.route('/generator/schema')
def schema():
    return render_template('generator/schema.html')

@app.route('/docs')
def docs():
    return render_template('docs/docs.html')