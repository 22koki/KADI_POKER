from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

# Initialize SQLAlchemy - this is the core part of the ORM that will be used for database interactions.
db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    # Define a table name for the User model
    __tablename__ = 'users'
