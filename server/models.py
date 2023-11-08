from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

bcrypt = Bcrypt()

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = "user"

    serialize_rules = ('-user_order.user', '-cart.user')

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True) 
    password = db.Column(db.String)  
    
    _password_hash = db.Column(db.String)

    user_order = db.relationship('UserOrder', back_populates='user')
    cart = db.relationship('Cart', back_populates='user')

    # def to_dict(self):
    #     return {
    #         "id": self.id,
    #         "email": self.email,  
    #         "password": self.password, 
    #         "orders": [],  
            
    #     }

    def __repr__(self):
        return f'<User {self.id}>'



    #######start#######
    @validates('email')
    def validate_email(self, key, email):
        if len(email) == 0:
            raise ValueError('Email must not be empty!')
        
        return email
    
    @validates('password')
    def validate_password(self, key, password):
        if len(password) == 0:
            raise ValueError('Passowrd must not be empty!')
        
        return password

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, user_pwd):
        pwd_hash = bcrypt.generate_password_hash(user_pwd.encode('utf-8'))
        self._password_hash = pwd_hash.decode('utf-8')

    def authenticate(self, pwd):
        return bcrypt.check_password_hash(self._password_hash, pwd.encode('utf-8'))
    #######end#######


class Cart(db.Model, SerializerMixin):
    __tablename__ = 'cart'

    serialize_rules = ('-user.cart','-item.cart')
    id = db.Column(db.Integer, primary_key=True)
    quantity =db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'))

    item = db.relationship('Item', back_populates = 'cart')
    user = db.relationship('User', back_populates = 'cart')

        
    def __repr__(self):
        return f'<Cart {self.id}>'


class UserOrder(db.Model, SerializerMixin):
    __tablename__ = 'user_order'

    serialize_rules = ('-user.user_order','-order.user_order')
    id = db.Column(db.Integer, primary_key=True)

    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    order = db.relationship('Order', back_populates = 'user_order')
    user = db.relationship('User', back_populates = 'user_order')

        
    def __repr__(self):
        return f'<UserOrder {self.id}>'


class Order(db.Model, SerializerMixin):
    __tablename__ = "order"

#created_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
#

    serialize_rules = ('-user_order.order', '-order_item.order')
    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.String)

    user_order = db.relationship('UserOrder', back_populates='order')
    order_item = db.relationship('OrderItem', back_populates='order')

    def to_dict(self):
        return {
            "id": self.id,
            "creation_date": self.creation_date,
            "user_id": self.user_id,
            "price": 0  
        }
    

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_item'

    serialize_rules = ('-item.order_item','-order.order_item')
    id = db.Column(db.Integer, primary_key=True)

    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'))

    order = db.relationship('Order', back_populates = 'order_item')
    item = db.relationship('Item', back_populates = 'order_item')

        
    def __repr__(self):
        return f'<OrderItem {self.id}>'




class Item(db.Model, SerializerMixin):
    __tablename__ = "item"

    serialize_rules = ('-order_item.item','-cart.item')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String)  
    stock = db.Column(db.Integer)     
    category = db.Column(db.String)  
    brand = db.Column(db.String)  

    order_item = db.relationship('OrderItem', back_populates='item')
    cart = db.relationship('Cart', back_populates='item')

    def to_dict(self):
        return {
            "id": self.id,
            "i_name": self.name,
            "i_img": self.image_url,
            "i_price": self.price,
            "i_stock": self.stock,
            "i_category": self.category,
            "i_brand": self.brand
        }


    #######start#######
    @validates('name')
    def validate_name(self, key, name):
        if len(name) == 0:
            raise ValueError('Name must not be empty!')
        
        return name
    
    @validates('price')
    def validate_price(self, key, price):
        if price is not None and not isinstance(price, (float, int)) or price <= 0:
            raise ValueError("Price must be a positive number.")
        return price
        

    #######end#######
