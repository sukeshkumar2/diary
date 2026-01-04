from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)

    entries = relationship("DiaryEntry", back_populates="owner")

class DiaryEntry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, index=True)
    content = Column(Text)
    mood = Column(String)  # Storing emoji as string
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="entries")
