
#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

from flask import Flask, request
from flask_cors import CORS

# Local imports
from config import app, db, api
# Add your model imports


#######start#######
from flask import Flask, jsonify, make_response, request, session
from flask_migrate import Migrate
from models import db, User, Order, Item
import os

app = Flask(__name__)

# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.secret_key = os.environ.get('SECRET_KEY')  # Use 'os.environ' instead of 'os.envrion'

db.init_app(app)
migrate = Migrate()
migrate.init_app(app, db)

excluded_endpoints = ['login', 'signup', 'check_session', 'root'] ### any other routes that does not need to be logged in

# @app.before_request
# def check_login_status():
#     if request.endpoint not in excluded_endpoints:
#         user_id = session.get('user_id')
#         user = User.query.filter(User.id == user_id).first()

#         if not user:
#             return {'error': 'Invalid Session.'}, 401
# #######end#######


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


# #######start#######
@app.post('/signup')
def signup():
    data = request.get_json()
    new_user = User(email=data['email'])
    new_user.password_hash = data['password']

    db.session.add(new_user)
    db.session.commit()

    return {'message': 'Registration Successful!'}, 201

# @app.post('/login')
# def login():
#     data = request.get_json()

#     user = User.query.filter(User.email == data['email']).first()

#     if not user:
#         return {'error': 'User not found.'}, 404
    
#     if user.authenticate(data['password']):
#         session['user_id'] = user.id
#         return {'message': 'Login Successful.'}, 201
#     else:
#         return {'error': 'Login failed, please try again.'}, 401

# @app.route('/check_session')
# def check_session():
#     user_id = session.get('user_id')
#     user = User.query.filter(User.id == user_id).first()

#     if not user:
#         return {'error': 'Invalid Session.'}, 401
    
#     return {'message': 'Session Valid, Access Granted'}, 200

@app.delete('/logout')
def logout():
    session.pop('user_id')

    return {'message': 'Successfully logged out.'}, 200
#######end#######


if __name__ == '__main__':
    app.run(port=5555, debug=True)
