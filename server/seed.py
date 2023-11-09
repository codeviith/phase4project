#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from random import choice 


# Local imports
from app import app, db  # Import the 'db' object from the 'app' module
from models import User, Order, Item, UserOrder, OrderItem, Cart

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Item.query.delete()
        Order.query.delete()
        UserOrder.query.delete()
        OrderItem.query.delete()
        Cart.query.delete()



        # Create and add users to the database
        user1 = User(email="user1@example.com", password="password1")
        user2 = User(email="user2@example.com", password="password2")

        db.session.add(user1)
        db.session.add(user2)

        item1 = Item(name="Item 1", price=10.99, image_url="item1.jpg", stock=100, category="Category A", brand="BRAND")
        item2 = Item(name="Item 2", price=15.99, image_url="item2.jpg", stock=50, category="Category B", brand="BRAND")
        item3 = Item(name="Item 3", price=15.99, image_url="item2.jpg", stock=50, category="Category B", brand="BRAND")


  
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(item1)
        db.session.add(item2)
        db.session.add(item3)


        db.session.commit()