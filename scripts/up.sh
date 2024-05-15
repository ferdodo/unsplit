#!/bin/bash
set -e

if ! docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "unsplit-cache"; then
    docker compose build cache
fi

docker compose build core
docker compose up -d -t 1 --build front
