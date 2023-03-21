<h1 style="text-align:center;font-size:70px;">NESTJS with GraphQL</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

This is Tutorial for learning NestJS with GraphQL

## Installation

```bash
# NPM
$ npm install

#YARN
$ yarn
```

## Environment Variables

__Rename ```.env.template``` to ```.env``` and put your local credentials__

## Running the app

```bash
# development
$ npm run start # NPM
$ yarn start # YARN

# watch mode
$ npm run start:dev # NPM
$ yarn start:dev # YARN

# production mode
$ npm run start:prod # NPM
$ yarn start:prod # YARN
```

## Test

```bash
# unit tests
$ npm run test # NPM
$ yarn test # YARN

# e2e tests
$ npm run test:e2e # NPM
$ yarn test:e2e # YARN

# test coverage
$ npm run test:cov # NPM
$ yarn test:cov # YARN
```

## GraphQL

__Check endpoints at:__

```http://locahost:3000/graphql```

## Docker

```bash
$ docker-compose up -d
```

## Node

__You can generate your JWT_SECRET with NODE__

```bash
# Enter to NODE REPL
$ node

# Execute this line
$ require('crypto').randomBytes(64).toString('hex');
```

__Copy generated secret and paste it into environment variables__

```.env```

```
JWT_SECRET="66d352a951c56a107e6efd14b7af3..."
```

## Seed Data

__You must to run on GraphQl the following endpoint:__

```graphql
mutation ExecuteSeed {
  executeSeed
}
```

__NOTE: This only runs on development mode__

__Make sure you have STATE environment variable pointed to dev__

```.env```

```
STATE=dev
```

__You must login again in order to generate a new token and put it on Authorization Headers__

**Example:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...
```