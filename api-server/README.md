# API Server

This is a mock REST API server using JSON Server to provide endpoints for all the demo applications.

## Available Endpoints

Base URL: `http://localhost:3001`

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `PATCH /users/:id` - Partial update user
- `DELETE /users/:id` - Delete user

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `PATCH /products/:id` - Partial update product
- `DELETE /products/:id` - Delete product

### Tasks

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `PATCH /tasks/:id` - Partial update task
- `DELETE /tasks/:id` - Delete task

## Running the Server

```bash
npm start
```

Server will run on port 3001 with CORS enabled for all origins.

## Query Parameters

JSON Server supports various query parameters:

- Filtering: `GET /users?role=Developer`
- Sorting: `GET /products?_sort=price&_order=desc`
- Pagination: `GET /tasks?_page=1&_limit=10`
- Search: `GET /users?q=john`

## Example Requests

### GET All Users

```bash
curl http://localhost:3001/users
```

### GET User by ID

```bash
curl http://localhost:3001/users/1
```

### POST Create User

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Brown","email":"alice@example.com","role":"Tester"}'
```

### PUT Update User

```bash
curl -X PUT http://localhost:3001/users/1 \
  -H "Content-Type: application/json" \
  -d '{"id":1,"name":"John Updated","email":"john.updated@example.com","role":"Senior Developer"}'
```

### DELETE User

```bash
curl -X DELETE http://localhost:3001/users/3
```
