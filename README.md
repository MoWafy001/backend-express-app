# Nadsoft Backend Assignment

## Table of Contents

- [Nadsoft Backend Assignment](#nadsoft-backend-assignment)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
    - [Problem Statement](#problem-statement)
    - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [Normal Installation](#normal-installation)
    - [Docker Installation](#docker-installation)
  - [Testing](#testing)
  - [Documentation](#documentation)
  - [Problem Solving Challenge](#problem-solving-challenge)

## Description

### Problem Statement

This is a simple REST API demonstrating the following skills and functionalities:

- CRUD operations
- Authentication
- Authorization
- Pagination
- code quality
- testing
- documentation
- deployment
- dockerization
- memoization

### Technologies Used

- Node.js
- Express.js
- Prisma ORM
- Jest
- Docker
- TypeScript
- MySQL

## Installation

### Normal Installation

1. install the dependencies

```bash
npm install
```

2. copy the .env.example file to .env, and update the values as per your environment

```bash
# copy the .env.example file to .env
cp .env.example .env
```

3. setup the database

```bash
npx prisma reset
# this will run the migrations and seed the database
```

4. start the server

```bash
npm run start
```

### Docker Installation

1. copy the .env.example file to .env.

```bash
# copy the .env.example file to .env
cp .env.example .env
```

1. setup the database before running docker. You can either install the dependencies and run the prisma as mentioned in the [normal installation](#normal-installation) or can manually run the SQL migrations and seed the database.
2. build and run the docker container

```bash
docker compose up
```

## Testing

> make sure the database in seeded before running the tests

run the following command to run the tests

```bash
npm run test
```

## Documentation

The endpoints and responses are included in [postman collection](./docs/NADSOFT%20Assignment.postman_collection.json) in the docs folder.

## Problem Solving Challenge

The [solution](./problem-solving/solution.md) is in the problem-solving folder.