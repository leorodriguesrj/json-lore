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

#### http://localhost:9001/schema/

- GET
  - Description: List all currently saved schemas. The list may be empty tho.
  - Request: The body of the request is ignored.
  - Response:
    - HTTP 200: Uppon success, the body contains a [HAL Resource][1] carrying
    the list of saved schemas.
    - HTTP 500: If an internal server error occurs.

- POST
  - Description: Creates or updates a schema.
  - Request: It MUST obey the ["post payload specification"][2].
  - Response:
    - HTTP 200: Uppon success, the body contains a [HAL Resource][1] carrying
    the representation of the saved schema.
    - HTTP 400: If the request fails to adhere to the [specification][2].
    - HTTP 500: If an internal server error occurs.

#### http://localhost:9001/schema/:id/

- GET
  - Description: Returns the single schema identified by ':id'.
  - Request: The body of the request is ignored.
  - Response:
    - HTTP 200: Uppon success, the body contains a [HAL Resource][1] carrying
    the representation of the reffered schema.
    - HTTP 404: If there is no schema saved under ':id'.
    - HTTP 500: If an internal server error occurs.

- PUT
  - Description: Updates an existing schema.
  - Request: It MUST obey the ["put payload specification"][3].
  - Response:
    - HTTP 200: Uppon success, the body contains a [HAL Resource][1] carrying
    the representation of the saved schema.
    - HTTP 400: If the request fails to adhere to the [specification][3].
    - HTTP 409: If the payload is marked with an 'id' different from ':id'.
    - HTTP 404: If there is no schema saved under ':id'.
    - HTTP 500: If an internal server error occurs.

#### http://localhost:9001/schema/:id/instance

- POST
  - Description: Validates a JSON object against a schema identified by ':id'
  - Request: It MUST obey the ["post instance payload specification"][4].
  - Response:
    - HTTP 200: Uppon success, the body contains a [HAL Resource][1] carrying
    the representation of the validation outcome.
    - HTTP 400: If the request fails to adhere to the [specification][4].
    - HTTP 404: If there is no schema saved under ':id'.
    - HTTP 500: If an internal server error occurs.

##### Payload specifications

The following links are available on any running instance, specifying the format
of the various payloads:

  - http://localhost:9001/meta-schema/post-payload
  - http://localhost:9001/meta-schema/put-payload
  - http://localhost:9001/meta-schema/post-instance-payload



[1]: "http://stateless.co/hal_specification.html"
[2]: "http://localhost:9001/meta-schema/post-payload"
[3]: "http://localhost:9001/meta-schema/put-payload"
[4]: "http://localhost:9001/meta-schema/post-instance-payload"