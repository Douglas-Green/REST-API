# ###REST API w/ Node Express MySQL

<u>"A Node.js REST API using Express and MySQL with CRUD operations, request logging, and error handling."</u>




markdownCopy code# MyAPI Express MySQL

A Node.js REST API using Express and MySQL with CRUD operations, request logging, and error handling.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete operations for managing characters.
- **Request Logging**: Logs all incoming requests to the database.
- **Error Handling**: Custom error handling middleware for graceful error responses.
- **CORS Enabled**: Cross-Origin Resource Sharing enabled for API access from different domains.
- **Environment Variables**: Configuration using `.env` file for database connection details.






```
## Setup

1. **Clone the repository**

git clone https://github.com/your-username/myapi-express-mysql.git
cd myapi-express-mysql
```

1. **Install dependencies**

```

npm install
```

1. **Create and configure the `.env` file**

```

touch .env
```

Add the following content to `.env`:

```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=password
DB_NAME=my_database
DB_PORT=3306
PORT=3000
```

1. **Set up the database**

Run the `setupDb.js` script to create the database tables:

```
node setupDb.js
```

1. **Populate the database with initial data**

Run the `populateDb.js` script to populate the database:

```
node populateDb.js
```

1. **Start the server**

Start the server using the following command:

```
npm run dev
```

The server will be running on `http://localhost:3000`.

## API Endpoints

- **GET /api/characters**: Retrieve all characters.
- **POST /api/characters**: Create a new character.
- **PUT /api/characters/:id**: Update an existing character by ID.
- **DELETE /api/characters/:id**: Delete an existing character by ID.
- **GET /api/requests**: Retrieve all logged requests.

## Error Handling

The API includes custom error handling middleware to manage and log errors, returning appropriate HTTP status codes and messages.

## Logging

All requests to the API are logged in the `requests` table with details such as method, endpoint, status, and timestamp.