# NodeJS (NestJS) BeDee To-Do List API

This is a simple To-Do List API built with NestJS. The application supports creating, reading, updating, and deleting tasks, and stores data in a JSON file.

## Prerequisites

- Node.js (>= 16.x)
- npm (>= 6.x)

## Installation

### Clone the repository

```bash
git clone https://github.com/Aekawan/be-dee-todo-list-api.git
cd be-dee-todo-list-api
```

### Install dependencies

```bash
npm install
```

### Running the application

Development mode

```bash
npm run start:dev
```

Production mode

```bash
npm run build
npm run start:prod
```

The application will be running at <http://localhost:3000>.

## API Endpoints

- GET /todos:  Get all to-do items.
- GET /todos/:id:  Get a specific to-do item by ID.
- POST /todos:  Create a new to-do item.
- PUT /todos/:id:  Update a specific to-do item by ID.
- DELETE /todos/:id: Delete a specific to-do item by ID.

## Example To-Do List

1. **ไปซื้อของวันหยุด**
   - [ ] ทำรายการของที่จะซื้อ
   - [ ] ตรวจสอบของในครัว
   - [ ] ไปตลาดสด
   - [ ] ไปซูเปอร์มาร์เก็ต
   - [ ] ซื้อของใช้ในบ้าน
   - [ ] ตรวจสอบรายการของที่ซื้อครบ
   - [ ] กลับบ้านและจัดเก็บของ

## Creating a To-Do Item

To create a new to-do item, send a POST request to the `/todos` endpoint with the following JSON body:

```json
{
  "title": "ทำรายการของที่จะซื้อ",
  "description": "จดรายการของที่ต้องซื้อทั้งหมด",
  "isCompleted": false
}
```

```bash
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{
  "title": "ทำรายการของที่จะซื้อ",
  "description": "จดรายการของที่ต้องซื้อทั้งหมด",
  "isCompleted": false
}'
```

## Updating a To-Do Item

To update an existing to-do item, send a PUT request to the /todos/:id endpoint with the following JSON body:

```json
{
  "title": "ทำรายการของที่จะซื้อ",
  "description": "จดรายการของที่ต้องซื้อทั้งหมดและเตรียมของที่ต้องการซื้อ",
  "isCompleted": true
}
```

```bash
curl -X PUT http://localhost:3000/todos/1 -H "Content-Type: application/json" -d '{
  "title": "ทำรายการของที่จะซื้อ",
  "description": "จดรายการของที่ต้องซื้อทั้งหมดและเตรียมของที่ต้องการซื้อ",
  "isCompleted": true
}'
```

## Using Docker

### Building the Docker image

```bash
  docker build -t be-dee-todo-list-api .
```

### Running the Docker container

```bash
  docker run -p 3000:3000 be-dee-todo-list-api
```

The application will be running at <http://localhost:3000>.

## Running Tests

### Unit tests

```bash
npm run test
```

### Test coverage

```bash
npm run test:cov
```

## Project Structure

```bash
src/
|-- app.controller.ts
|-- app.module.ts
|-- app.service.ts
|-- main.ts
|-- todos/
    |-- todos.controller.ts
    |-- todos.module.ts
    |-- todos.service.ts
|-- db/
    |-- todos.json
```

## Technologies Used

- NestJS
- TypeScript
- Jest
- Docker
