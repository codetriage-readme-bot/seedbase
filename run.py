from app import app, initialize_api

if __name__ == '__main__':
  initialize_api(app)
  app.run(host='0.0.0.0', port=8080, debug=True)