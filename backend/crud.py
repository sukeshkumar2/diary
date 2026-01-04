from sqlalchemy.orm import Session
from . import models, schemas, auth

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_entries(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.DiaryEntry).filter(models.DiaryEntry.owner_id == user_id).order_by(models.DiaryEntry.date.desc()).offset(skip).limit(limit).all()

def get_entry_by_date(db: Session, user_id: int, date):
    return db.query(models.DiaryEntry).filter(models.DiaryEntry.owner_id == user_id, models.DiaryEntry.date == date).first()

def create_entry(db: Session, entry: schemas.DiaryEntryCreate, user_id: int):
    db_entry = models.DiaryEntry(**entry.dict(), owner_id=user_id)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def update_entry(db: Session, entry_id: int, entry: schemas.DiaryEntryCreate):
    db_entry = db.query(models.DiaryEntry).filter(models.DiaryEntry.id == entry_id).first()
    db_entry.content = entry.content
    db_entry.mood = entry.mood
    db.commit()
    db.refresh(db_entry)
    return db_entry
