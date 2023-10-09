# To-Do List

## Description

Simple REST API written in TypeScript using the Node.js framework NestJS.
It connects with a MongoDB database to perform CRUD actions with the data.

# Contents

- [To-Do List](#to-do-list)
  - [Description](#description)
- [Contents](#contents)
  - [Getting started](#getting-started)
    - [1. Getting Docker Compose](#1-getting-docker-compose)
    - [2. Getting Git](#2-getting-git)
    - [3. Cloning the project from Github](#3-cloning-the-project-from-github)
    - [4. Run the application](#4-run-the-application)
    - [5. Get a welcome message!](#5-get-a-welcome-message)
  - [Using the app](#using-the-app)
    - [Creating a new To-Do](#creating-a-new-to-do)
    - [Consulting To-Dos](#consulting-to-dos)
    - [Updating To-Dos](#updating-to-dos)
    - [Deleting To-Dos](#deleting-to-dos)
      - [Delete all the to-Dos](#delete-all-the-to-dos)
      - [Delete one To-Do by ID](#delete-one-to-do-by-id)
  - [Swagger Documentation](#swagger-documentation)

## Getting started

### 1. Getting Docker Compose

Go to this link:

- [Docker Docs](https://www.docker.com/products/docker-desktop/)
  (Official documentation about downloading **Docker Desktop**)

and follow the steps according to your operating system.

### 2. Getting Git

Go to this link:

- [Git Guides](https://github.com/git-guides/install-git) (Officia
  documentation about downloading **Git**)

and follow the steps according to your operating system.

### 3. Cloning the project from [Github](https://github.com)

Once you have **Docker Compose** and **Git** you need to open your terminal and
navigates into the directory where you want to clone project files.

For example:

```console
$ cd usr/documents/to-do-app
```

Then clone the repository.

```console
$ git clone https://github.com/EnmanuelFerrer/to-do-list.git
```

This command is going to clone the project files in your directory.

### 4. Run the application

To run the application you have to use **Docker Compose** command.

```console
$ docker compose up
```

This command is going to create the To-Do List application image and MongoDB
database image then containerize them and run.

### 5. Get a welcome message!

Use your web browser and type this in the navigation bar ant press ENTER:

```console
http://localhost:3000
```

You are going to get a message like this

```console
Welcome to your To-Do List
```

## Using the app

To interact with the API you need to use a REST client.

You can download tools like **Postman** to make it easier.

- [Download Postman](https://www.postman.com/downloads/)

Run **Postman** and go to the dropdown button
at the left of the input text bar and click on it. You will see all the
**HTTP methods** available.

- GET
- POST
- PUT
- PATCH
- DELETE
- HEAD
- OPTIONS

This application only uses the following methods:

- GET
- POST
- PUT
- DELETE

With **Postman** you can send **HTTP Requests** as a client to your HTTP server
and get responses.

After this point, you have to type:

```console
localhost:3000/to-dos
```

in the input to interact with the To-Do List.

---

### Creating a new To-Do

Use the **GET** method and type:

```console
localhost:3000/to-dos
```

Now click on the button **Body** under the input text.

Then go down and select **raw**, go to the right and click on the dropdown
button, and select **JSON**. Under it, you have a space to write your JSON
Body.

This is an example:

```json
// JSON body to create a new To-Do
{
  "title": "Sleep",
  "description": "I have to sleep because I have a big headache",
  "completed": false,
  "tags": ["health", "rest", "3:35 a.m."]
}
```

Now you can hit the **Send** button to send your request and see the response.

Response may look like this:

```json
// Server response
{
  "title": "Sleep",
  "description": "I have to sleep because I have a big headache",
  "completed": false,
  "tags": ["health", "rest", "3:35 a.m."],
  "_id": "65225bdd953b8493edf7cf6c",
  "createdAt": "2023-10-08T07:35:57.141Z",
  "updatedAt": "2023-10-08T07:35:57.141Z",
  "__v": 0
}
```

---

### Consulting To-Dos

There are two ways to do it.

1. Get all the To-Dos
2. Get one To-Do searching by ID

First, create a second To-Do:

```json
// JSON body to create a new To-Do
{
  "title": "Eat",
  "description": "I have to eat because I'm hungry",
  "completed": false,
  "tags": ["food", "stomach", "3:45 a.m."]
}
```

```json
// Server response
{
  "title": "Eat",
  "description": "I have to eat because I'm hungry",
  "completed": false,
  "tags": ["food", "stomach", "3:45 a.m."],
  "_id": "65225ed9953b8493edf7cf6f",
  "createdAt": "2023-10-08T07:48:41.650Z",
  "updatedAt": "2023-10-08T07:48:41.650Z",
  "__v": 0
}
```

Let's see the first consulting option.

Select **GET method** and send the request, it is going to respond with an
array of To-Dos.

```json
// Server response. An array of To-Dos
[
  {
    "_id": "65225bdd953b8493edf7cf6c",
    "title": "Sleep",
    "description": "I have to sleep because I have a big headache",
    "completed": false,
    "tags": ["health", "rest", "3:35 a. m."],
    "createdAt": "2023-10-08T07:35:57.141Z",
    "updatedAt": "2023-10-08T07:35:57.141Z",
    "__v": 0
  },
  {
    "_id": "65225ed9953b8493edf7cf6f",
    "title": "Eat",
    "description": "I have to eat because I'm hungry",
    "completed": false,
    "tags": ["food", "stomach", "3:45 a.m."],
    "createdAt": "2023-10-08T07:48:41.650Z",
    "updatedAt": "2023-10-08T07:48:41.650Z",
    "__v": 0
  }
]
```

The second option searches by ID, so just copy the ID of the To-Do that
you just create and paste it after the application URL.

```console
<application-url>/<to-do-id>
```

Should look's like this:

```console
localhost:3000/to-dos/65225ed9953b8493edf7cf6f
```

hit **Send** and the API will respond to you with your 'Eat' To-Do
object.

```json
// Server response
{
  "_id": "65225ed9953b8493edf7cf6f",
  "title": "Eat",
  "description": "I have to eat because I'm hungry",
  "completed": false,
  "tags": ["food", "stomach", "3:45 a.m."],
  "createdAt": "2023-10-08T07:48:41.650Z",
  "updatedAt": "2023-10-08T07:48:41.650Z",
  "__v": 0
}
```

> **Note:** You can access these two endpoints using your web browser if you
> have at least one To-Do created.
>
> Get all the To-Dos
>
> ```console
> http://localhost:3000/to-dos/
> ```
>
> Get one To-Do by ID
> ```console
> http://localhost:3000/to-dos/65225ed9953b8493edf7cf6f
> ```

---

### Updating To-Dos

To update a To-Do object you just have to use the ID that you used previously
and, method the HTTP method to **PUT** and modify the JSON's Body with new
information.

```json
// JSON Body with new data to update To-Do
{
  "title": "Cold",
  "description": "I have to dress warm because the weather is freezing",
  "completed": false,
  "tags": ["coat", "jacket", "4:00 a.m."]
}
```

The server should respond with the updated To-DO.

```json
// Updated To-Do
{
  "_id": "65225ed9953b8493edf7cf6f",
  "title": "Cold",
  "description": "I have to dress warm because the weather is freezing",
  "completed": false,
  "tags": ["coat", "jacket", "4:00 a.m."],
  "createdAt": "2023-10-08T07:48:41.650Z",
  "updatedAt": "2023-10-08T08:05:30.458Z",
  "__v": 0
}
```

---

### Deleting To-Dos

There are two ways to delete To-Dos, like consulting.

1. Delete all the to-Dos
2. Delete one To-Do by ID:

#### Delete all the to-Dos

To delete all the to-Dos, you have to select the
**DELETE** method and send the request.

#### Delete one To-Do by ID

To delete one To-Do by the ID you have to **paste** the To-Do ID after the
application's direction and hit **Send**.

```console
localhost:3000/65225ed9953b8493edf7cf6f
```

> **Note:** You can access these two endpoints using your web browser if you
> have at least one To-Do created.
>
> Delete all the To-Dos
>
> ```console
> http://localhost:3000/to-dos/
> ```
>
> Delete one To-Do by ID
> ```console
> http://localhost:3000/to-dos/65225ed9953b8493edf7cf6f
> ```

## Swagger Documentation

To access the Swagger documentation just go to your browser and type this URL
in the navigation bar.

```console
http://localhost:3000/api
```
