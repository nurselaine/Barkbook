# BarkBook Back End

## Author: Elaine Huynh

### Deployed server
https://barkbook-prod-server.onrender.com

### Run Locally
    - npm i
    - node index.js

### Description

This is a simple RESTful server using express and NodeJS. It's main purpose is to utilize data from an API and store the data within a MySQL database. It also provides authentication and authorization for users to be added within the database and to store their user info within the application.

### Server Outline - data model
![barkbook server](./assets/data-model.png)

### Database Schema
![Barkbook MySQL Schema](./assets/sql_schema.png)

### Endpoint
    - CITE/getDogs
        - Retrieves all available dog data within the database
            - includes image and Id
    - CITE/getDogs/${id}
        - Retrieves data for one dog specifically
            - includes: name, image, age, location, Id, likes, comments
    - CITE/login
        - Authenticates user account and returns a 200 code status or a 404 "Not a user" error
    - CITE/signup
        - Adds user information to the database and returns a 200 code status
