from django import forms
from .models import WailistEntry
from django.utils import timezone


class WaitlistEntryCreateForm(forms.ModelForm):
    # Email = forms.EmailField()
    class Meta:
        model = WailistEntry
        fields = ['email']

    def clean_email(self):
        email = self.cleaned_data.get("email")
        today = timezone.now().day
        qs = WailistEntry.objects.filter(email=email, timestamp__day=today)
        if qs.count() > 5:
            raise forms.ValidationError("Cannot enter this email again today")
        # if email.endswith('@gmail.com'):
        #     raise forms.ValidationError('Cannot use gmail')
        return email
