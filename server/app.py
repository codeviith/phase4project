
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
from models import db, User, Order, Item, UserOrder, OrderItem, Cart
import os

app = Flask(__name__)
app.secret_key = "abc123"



CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 


db.init_app(app)
migrate = Migrate()
migrate.init_app(app, db)

excluded_endpoints = ['login', 'signup', 'check_session', 'root', 'items'] ### any other routes that does not need to be logged in

# @app.before_request
# def check_logged_in():
#     if request.endpoint not in excluded_endpoints:
#         user_id = session.get('user_id')
#         user = User.query.filter(User.id == user_id).first()

#         if not user:
#             # invalid cookie
#             return {'message': 'invalid session'}, 401


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


# #######start#######
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    new_user = User(email=data['email'])
    new_user.password_hash = data['password']

    db.session.add(new_user)
    db.session.commit()

    return {'message': 'Registration Successful!'}, 201


from flask import jsonify

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # check if user exists
    user = User.query.filter(User.email == data['email']).first()

    if not user:
        return jsonify({'error': 'User not found.'}), 404
    
    if user.authenticate(data['password']):
        # passwords matched, add cookie
        session['user_id'] = user.id
        user_data = {
            'id': user.id,
            'email': user.email,
            # Add other user details as needed
        }
        return jsonify({'message': 'Login successful!', 'user': user_data}), 200
    else:
        # password did not match, send error resp
        return jsonify({'error': 'Invalid email or password.'}), 401


@app.route('/check_session')
def check_session():
    user_id = session.get('user_id')
    user = User.query.filter(User.id == user_id).first()

    if not user:
        return {'error': 'Invalid Session.'}, 401
    
    return {'message': 'Session Valid, Access Granted'}, 200

@app.delete('/logout')
def logout():
    session.pop('user_id')

    return {'message': 'Successfully logged out.'}, 200
#######end#######


@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    body = [item.to_dict() for item in items]
    return jsonify(body), 200


@app.route('/items/<int:item_id>', methods=['PATCH'])
def item_to_cart(item_id):
    new_stock = request.json.get('new_stock')

    item = Item.query.get(item_id)

    if item:
        item.stock = new_stock
        db.session.commit()
        return jsonify({'message': 'Stock updated successfully'}), 200
    else:
        return jsonify({'error': 'Item not found'}), 404
    


    
@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()

    user_id = data.get('user_id')
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    # Check if user and item exist
    user = User.query.get(user_id)
    item = Item.query.get(item_id)

    if not user or not item:
        return jsonify({'error': 'User or item not found'}), 404

    # Check if there is enough stock
    if item.stock >= quantity:
        # Check if the item is already in the cart for the user
        existing_cart_entry = Cart.query.filter_by(user_id=user_id, item_id=item_id).first()

        if existing_cart_entry:
            # If the item is already in the cart, update the quantity
            existing_cart_entry.quantity += quantity
        else:
            # Otherwise, create a new Cart entry
            cart_entry = Cart(quantity=quantity, user=user, item=item)
            db.session.add(cart_entry)

        # Update the item stock
        item.stock -= quantity
        db.session.commit()

        return jsonify({'message': 'Item added to the cart successfully'}), 200
    else:
        return jsonify({'error': 'Not enough stock'}), 400

























if __name__ == '__main__':
    app.run(port=5555, debug=True)
