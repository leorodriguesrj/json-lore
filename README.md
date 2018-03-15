# json-lore
A JSON schema database and validation tool.

This is very small application developed using Node JS and Javascript 6
to "stash" JSON Schemas.

Schemas are saved with a certain name under "http://host:port/schemas/:id".
The application currently uses the filesystem to save the schemas.

## Instalation

In order to install, you must have Node 8.X or later installed first. Then you
just need to run npm install after clonning as follows.

```bash
$ git clone git@github.com:leorodriguesrj/json-lore.git
$ cd json-lore
$ npm install
$
```

## Configuration

The following environment variables are available to configure the system:

- JSON_LORE_PORT: Default 9001; Its an integer number specifying the
HTTP port to listen to.

- LORE_DATA_PATH: Default '/var/lib/json-lore'; Its a string specifying the
path in which the json schemas will be saved.

The following commands configure the application to listen on port 80 and save
all schemas to the 'json-lore-data' located at the user's home directory:

```bash
$ export JSON_LORE_PORT=80
$ export LORE_DATA_PATH=~/json-lore-data
$
```

## Usage

To run the application, change the current directory to the installed
application path and run the start command:

```bash
$ cd json-lore
$ npm start
```

It will run the application with default configuration.

### Endpoints

The following endpoints are exposed as part of the REST API:

#### http://localhost:9001/schema - Allows GET and POST

- GET: Returns a list of currently saved schemas. The body of the request is
ignored.

- POST: Creates or updates a schema. The body of the request is required and
MUST obey the schema specification at http://localhost:9001/meta-schema/post.

#### http://localhost:9001/schema/:id - Allows GET and PUT

- GET: Return the single schema identified by ':id'. The resquest's body is
ignored.

- PUT: Updates a schema. The body of the request is required and MUST obey the
schema specification at http://localhost:9001/meta-schema/put. Also if the
'id' carried in the body differs from the one in the URL, the PUT operation will
fail.

#### http://localhost:9001/schema/:id/instance - Allows only POST

An instance of a schema is a JSON object which is supposed to adhere to the
format specified by said schema.

When you post a JSON object on this endpoint, the app will run a validation
procedure of that object against the schema identified by ':id'.

If the schema ':id' exists, the response (under normal operation) will be HTTP
200 and the body will have the outcome of the operation.

If the schema ':id' does not exists, the response will be HTTP 404.