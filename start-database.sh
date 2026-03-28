#!/bin/bash
docker run --name hammad-legacy-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=verceldb -p 5432:5432 -d postgres:alpine
echo "Postgres started on port 5432"
