from flask import render_template
from app import app

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/generator')
def generator():
    return render_template('generator.html')

@app.route('/docs')
def docs():
    return render_template('docs.html')