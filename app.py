# Imports 
from flask import Flask, render_template

# My Application
app = Flask(__name__)


### Create our first page index will be the homepage
# The first main page of the application and We're creating
# a route for the main homepage.

@app.route("/")
def index(): # This is the main homepage
    return render_template("index.html") #


if __name__ == "__main__": # This ensures the app runs only if this file is executed directly
    app.run(debug=True) # The debug=True will allow us to see errors in the browser and automatically reload the server when changes are made.
    # The app will run on http://127.0.0.1:5000

