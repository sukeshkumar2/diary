from pydantic import BaseModel
from typing import Optional
from datetime import date

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class DiaryEntryBase(BaseModel):
    content: str
    mood: str
    date: date

class DiaryEntryCreate(DiaryEntryBase):
    pass

class DiaryEntry(DiaryEntryBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
