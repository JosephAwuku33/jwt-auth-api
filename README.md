
# JWT Auth Basics

Basically reviewing a JWT Auth and API, makes use of JSON for storing user data 



## Tech Stack

- Node.js
- Express
- Jest
- Supertest



## Features

- Signup
- Login
- Check Profile




## API Reference

#### Register

```http
  POST /register
```

| Body Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. A name of your choice|
| `password` | `string` | **Required**. A password of your choice|


#### Login

```http
  POST /login
```

| Body Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. A name of your choice|
| `password` | `string` | **Required**. A password of your choice|

#### Get profile

```http
  GET /profile
```

| Header(Bearer Auth) | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. access token of user to fetch |


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd jwt-auth-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET_KEY`

`PORT`

## Running Tests

To run tests, run the following command

```bash
  npm test
```

