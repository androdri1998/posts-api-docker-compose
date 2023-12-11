# posts-api-docker-compose

This is a project to practice Node.js, typescript and docker compose.

This project it's possible create, update, list and delete posts.

## Main libs

- fastify
- typeorm
- date-fns
- dotenv
- jest
- mysql
- typescript
- docker
- docker-compose

## requirements

- Need to have [docker](https://www.docker.com/get-started/) installed.
- Need to have [docker-compose](https://docs.docker.com/compose/install/) installed.

## Setup Project

To setup project follow these steps ahead.

### 1. Create a `.env` file

Create a `.env` file at root directory, there's a `.env.example` to be used as a draft and model.

### 2. Fill environment Variables

```
MYSQL_DATABASE=[MYSQL_DATABASE]
MYSQL_USER=[MYSQL_USER]
MYSQL_PASSWORD=[MYSQL_PASSWORD]
MYSQL_ROOT_PASSWORD=[MYSQL_ROOT_PASSWORD]
MYSQL_PORT=[MYSQL_PORT]

# MYSQL_HOST there's no need to fill, this variable is provided by docker compose setup
MYSQL_HOST=[MYSQL_HOST]

NODE_POSTS_API_PORT=[NODE_POSTS_API_PORT]
NODE_APP_HOST=[NODE_APP_HOST]
NODE_ENV=[NODE_ENV]
```

### 3. Start container with docker compose

`$ docker-compose up -d`

## Application

### Access producer API

- API will be available at host `localhost` and port `[NODE_POSTS_API_PORT`.

### Routes

- Create a new post

```
POST http://localhost:[NODE_POSTS_API_PORT]/posts
BODY {
  content: string,
  author: string
}
```

- Get post

```
GET http://localhost:[NODE_POSTS_API_PORT]/posts/:id
```

- Get posts

```
GET http://localhost:[NODE_POSTS_API_PORT]/posts
QUERY {
  page: number,
  limit: number,
}
```

- Update post

```
PATCH http://localhost:[NODE_POSTS_API_PORT]/posts/:id
BODY {
  content: string,
  author: string
}
```

- Delete a post

```
DELETE http://localhost:[NODE_POSTS_API_PORT]/posts/:id
BODY {}
```

### Access MySQL

- Database structure:

```
Table posts
Fields
  id
  content
  author
  status
  created_at
  updated_at
```

An application to see database it's needed, host to connect it's `localhost` and port it's `[MYSQL_PORT]`.

- Credentials:

```
MYSQL_USER=[MYSQL_USER]
MYSQL_PASSWORD=[MYSQL_PASSWORD]
MYSQL_ROOT_PASSWORD=[MYSQL_ROOT_PASSWORD]
```

`to access as a root user use root user and [MYSQL_ROOT_PASSWORD]`

## Stop project

### Stop and remove containers created by docker compose

`$ docker-compose down`

### Stop and remove containers and remove images created by docker compose

`$ docker-compose down --rmi all`

## Development

### To update docker images with services changes

Run this commands

1. `$ docker-compose down`
2. `$ docker-compose build`
3. `$ docker-compose up -d`

## Available Commands

### posts-api

- `$ npm run test`
  To run unit tests
- `$ npm start`
  To run application
- `$ npm run build`
  To build application
- `$ npm run dev`
  To run in dev mode watching changes
