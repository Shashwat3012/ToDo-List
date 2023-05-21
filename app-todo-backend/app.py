from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import sys
import pymongo

app = Flask(__name__)
CORS(app)

# MongoDB connection
# client = MongoClient("mongodb+srv://shashwattripathi:0VxcsURVQyK6ULhD@localghost.i2ouhm1.mongodb.net/?retryWrites=true&w=majority")
# db = client['task_list']
# todos_collection = db['todo-app']

try:
    client = pymongo.MongoClient(
        "mongodb+srv://shashwattripathi:0VxcsURVQyK6ULhD@localghost.i2ouhm1.mongodb.net/?retryWrites=true&w=majority")

# return a friendly error if a URI error is thrown 
except pymongo.errors.ConfigurationError:
    print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
    sys.exit(1)

# use a database named "myDatabase"
db = client.taskList

# use a collection named "recipes"
todos_collection = db["todo-app"]

recipe_documents = [
    {"name": "elotes", "ingredients": ["corn", "mayonnaise", "cotija cheese", "sour cream", "lime"], "prep_time": 35},
    {"name": "loco moco", "ingredients": ["ground beef", "butter", "onion", "egg", "bread bun", "mushrooms"],
     "prep_time": 54},
    {"name": "patatas bravas", "ingredients": ["potato", "tomato", "olive oil", "onion", "garlic", "paprika"],
     "prep_time": 80},
    {"name": "fried rice", "ingredients": ["rice", "soy sauce", "egg", "onion", "pea", "carrot", "sesame oil"],
     "prep_time": 40}]


@app.route('/api/todo-app', methods=['GET'])
def get_todo():
    todo = list(todos_collection.find({}, {'_id': False}))
    return jsonify(todo)

    # task = collection.find_one({"_id": task_id})
    # if task:
    #     print("Title:", task["title"])
    #     print("Description:", task["description"])
    # else:
    #     print("Task not found.")


@app.route('/api/todo-app', methods=['POST'])
def add_todo():
    # new_todo = request.json['text']
    # todos_collection.insert_one({'text': 'new_todo'})
    # return '', 201
    print("helloooo I am here!!!!!!")
    try:
        new_todo = request.json['text']
        print(new_todo)
        #task = {"task": new_todo, "added_time": , "completed_time": }
        todos_collection.insert_one({'text': new_todo})
        # result = todos_collection.insert_many(recipe_documents)
    # returning a friendly error if the operation fails
    except pymongo.errors.OperationFailure:
        print(
            "An error was received while adding a new record.")
        sys.exit(1)
    else:
        print("I inserted a new record")
        print("\n")
    return 'Successfully added new task', 201

@app.route('/api/todo-app/<id>', methods=['PUT'])
def edit_todo(id):

    return '', 201

@app.route('/api/todo-app/<id>', methods=['DELETE'])
def delete_todo(id):
    todos_collection.delete_one({'_id': id})
    return '', 204


def sort_todo(id):
    def get_sorted_tasks(sort_field):
        tasks = todos_collection.find().sort(sort_field)
        return list(tasks)


if __name__ == '__main__':
    # app.run()
    app.run(host="0.0.0.0", port=3001)
