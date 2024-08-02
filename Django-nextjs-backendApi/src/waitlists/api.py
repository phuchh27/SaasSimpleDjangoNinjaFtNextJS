
import json
from ninja import Router
from typing import List

import helpers
from .schemas import (WaitlistEntryListSchema, WaitlistEntryDetailSchema,
                      WaitlistEntryCreateSchema, ErrorWaitlistEntryCreateSchema)
from .models import WailistEntry
from django.shortcuts import get_object_or_404
from ninja_jwt.authentication import JWTAuth
from .form import WaitlistEntryCreateForm
router = Router()


@router.get('',
            response=List[WaitlistEntryListSchema],
            auth=helpers.api_auth_user_required)
def list_waitlist_entries(request):
    qs = WailistEntry.objects.filter(user=request.user)
    return qs


@router.get("{entry_id}/",
            response=WaitlistEntryDetailSchema,
            auth=helpers.api_auth_user_required)
def get_waitlist_entry(request, entry_id: int):
    obj = get_object_or_404(
        WailistEntry,
        id=entry_id,
        user=request.user
    )
    return obj


@router.post('',
             response={200: WaitlistEntryDetailSchema,
                       400: ErrorWaitlistEntryCreateSchema},
             auth=helpers.api_auth_user_or_annon)
def create_waitlist_entry(request, data: WaitlistEntryCreateSchema):
    form = WaitlistEntryCreateForm(data.dict())
    if not form.is_valid():
        form_error = json.loads(form.errors.as_json())
        print(form_error)
        return 400, form_error
        # cleaned_data = form.cleaned_data()
        # obj = WailistEntry(**cleaned_data.dict())
    obj = form.save(commit=False)
    if request.user.is_authenticated:
        obj.user = request.user
    obj.save()
    return obj
