
from pydantic import BaseModel, EmailStr, Field


# Student Registration Schema
class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


# Student Login Schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str
