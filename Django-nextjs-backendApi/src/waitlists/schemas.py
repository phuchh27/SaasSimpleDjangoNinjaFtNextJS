from datetime import datetime
from ninja import Schema
from pydantic import EmailStr
from typing import List, Any, Optional


class WaitlistEntryCreateSchema(Schema):
    # Create -> Data
    # WaitlistEntryIn
    email: EmailStr


class ErrorWaitlistEntryCreateSchema(Schema):
    # Create -> Data
    # WaitlistEntryIn
    email: List[Any]
    # non_field_error: List[dict]


class WaitlistEntryDetailSchema(Schema):
    # Get -> Data
    # WaitlistEntryOut
    email: EmailStr
    timestamp: datetime
    update: datetime


class WaitlistEntryListSchema(Schema):
    # List -> Data
    # WaitlistEntryOut
    id: int
    email: EmailStr
