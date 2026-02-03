#!/bin/bash

# curl \
#   -X POST http://localhost:3001/users \
#   -d '{"name":"lilin","email":"lilin@lilin.com"}' \
#   -H "Content-Type: application/json"


# curl \
#   -X POST http://localhost:3001/users \
#   -d '{"name":"shuhao","email":"shuhao@lilin.com"}' \
#   -H "Content-Type: application/json"

# curl \
#   -X DELETE http://localhost:3001/users/3 \


# curl \
#   -X PUT http://localhost:3001/users/4 \
#   -d '{"name":"shushu","email":"shushu@lilin.com"}' \
#   -H "Content-Type: application/json"

# curl \
#   -X GET http://localhost:3001/users/2


curl \
  -X GET http://localhost:3001/users