from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta, date
from typing import List

from . import models, schemas, crud, auth, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/me/", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@app.get("/entries/", response_model=List[schemas.DiaryEntry])
def read_entries(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    entries = crud.get_entries(db, user_id=current_user.id, skip=skip, limit=limit)
    return entries

@app.get("/entries/{date_str}", response_model=schemas.DiaryEntry)
def read_entry_by_date(date_str: str, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    # Parse date from string YYYY-MM-DD
    try:
        entry_date = date.fromisoformat(date_str)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    entry = crud.get_entry_by_date(db, user_id=current_user.id, date=entry_date)
    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry

@app.post("/entries/", response_model=schemas.DiaryEntry)
def create_diary_entry(entry: schemas.DiaryEntryCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    # Check if entry already exists for this date
    existing_entry = crud.get_entry_by_date(db, user_id=current_user.id, date=entry.date)
    if existing_entry:
         # Update existing
         return crud.update_entry(db, entry_id=existing_entry.id, entry=entry)
    return crud.create_entry(db=db, entry=entry, user_id=current_user.id)
