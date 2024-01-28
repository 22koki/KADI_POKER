from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

# Initialize SQLAlchemy - this is the core part of the ORM that will be used for database interactions.
db = SQLAlchemy()
