from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import pymongo
import datetime

app = Flask(__name__)
CORS(app)

# MongoDB connection
try:
    client = pymongo.MongoClient(
        "mongodb+srv://shashwattripathi:0VxcsURVQyK6ULhD@localghost.i2ouhm1.mongodb.net/?retryWrites=true&w=majority")

# return a friendly error if a URI error is thrown 
except pymongo.errors.ConfigurationError:
    print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
    sys.exit(1)

# use a database named "taskList"
db = client.taskList

# use a collection named "todo-app"
todos_collection = db["todo-app"]
count = 1


@app.route('/api/todo-app', methods=['GET'])
def get_todo():
    todo = list(todos_collection.find({}, {'_id': False}))
    return jsonify(todo)


@app.route('/api/todo-app', methods=['POST'])
def add_todo():
    global count
    try:
        new_todo = request.json['text']
        id = count
        data = {'id': id, 'task': (new_todo,), 'added_time': str(datetime.datetime.now())}
        # json_data = json.dumps(data)
        todos_collection.insert_one(data)
    # returning a friendly error if the operation fails
    except pymongo.errors.OperationFailure:
        print(
            "An error was received while adding a new record.")
        sys.exit(1)
    else:
        count += 1
        print("I inserted a new record")
        print("\n")
    return 'Successfully added new task', 201


@app.route('/api/todo-app/<id>', methods=['PUT'])
def edit_todo(id):
    filter = {'id': id}
    new_todo = request.json['newTask']
    # Values to be updated.
    newvalues = {"$set": {'task': new_todo}}

    # Using update_one() method for single updation.
    todos_collection.update_one(filter, newvalues)
    return 'Updated task successfully', 200


@app.route('/api/todo-app/<id>', methods=['DELETE'])
def delete_todo(id):
    #    db.todos_collection.remove({'_id': id})
    print(id)
    myquery = {"id": id}
    x = todos_collection.delete_many(myquery)
    print(x)
    #db.todos_collection.delete_one({'id': id})
    return 'Deleted Successfully', 204


if __name__ == '__main__':
    # app.run()
    app.run(host="0.0.0.0", port=3001)
