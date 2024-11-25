#  Challenge

Create an app with two panels

left:
polls an epoch time in seconds from a server every thirty seconds

right:
displays prometheus-metrics for the api

## Technologies used

### Development

#### Server
- Node,
- express
- dotenv
- cors

#### Client

- React with Vite
- axios
- tanstack/react-query

#### Testing / Validation
- Vitest
- react-testing-library
- Zod


# Setting up the Server

cd into server

run ```npm i ```

create a ```.env``` file at server route and add the following config

```AUTH_TOKEN={secretTokenListed in challenge doc}```


# Setting up the client

cd into the client folder

run ```npm i ```

create an ```.env``` file at client route and add the following config

```VITE_AUTH_TOKEN={secretTokenListed in challenge doc}```
```VITE_BASE_URL=http://localhost:8080```

# Running the solution

This will run the app in a development envinroment. You will need two terminal windows, one for client and one for server

In the server terminal run

```npm run dev```

in the client terminal run

```npm run dev```

Navigate to ```localhost:5173``` in your browser

# Building the solution

build the project with in each directory

```npm run build```