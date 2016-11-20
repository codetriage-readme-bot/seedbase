from app import app, initialize_api, initialize_login

if __name__ == '__main__':
  initialize_api(app)
  initialize_login(app)
  app.run(host='0.0.0.0', port=8080, debug=True)