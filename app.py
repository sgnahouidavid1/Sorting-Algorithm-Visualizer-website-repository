# Imports 
from flask import Flask, render_template

# My Application
app = Flask(__name__)


### Create our first page index will be the homepage
# The first main page of the application and We're creating
# a route for the main homepage.

@app.route("/")
def index():
    return render_template("index.html")


if __name__ in "__main__":
    app.run(debug=True)

