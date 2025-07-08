from aws_lambda_powertools.event_handler import APIGatewayRestResolver
from aws_lambda_powertools.utilities.typing import LambdaContext

app = APIGatewayRestResolver()

@app.post("/users")
def create_user():
    return {"message": "User created"}

@app.get("/users/<user_id>")
def get_user(user_id: str):
    return {"userId": user_id, "name": "John Doe"}

@app.put("users/<user_id>")
def update_user(user_id: str):
    user_data = app.current_event.json_body
    return {"message": f"User {user_id} updated", "data": user_data}

# TODO: login endpoint

def handler(event: dict, context: LambdaContext) -> dict:
    return app.resolve(event, context)