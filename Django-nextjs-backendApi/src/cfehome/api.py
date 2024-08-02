from ninja import NinjaAPI, Schema
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_jwt.authentication import JWTAuth
import helpers
api_v1 = NinjaExtraAPI()
api_v1.register_controllers(NinjaJWTDefaultController)
api_v1.add_router('/waitlists/', 'waitlists.api.router')


class UserSchema(Schema):
    username: str
    is_authenticated: bool
    email: str = None


@api_v1.get('hello')
def hello(request):
    print(request)
    return {"message": "hello world"}


@api_v1.get("/me", response=UserSchema, auth=helpers.api_auth_user_required)
def hello(request):
    return request.user
