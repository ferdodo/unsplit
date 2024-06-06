#!/bin/bash
result=$(df / -BM | sed '1d' | awk '{print int($4)}')

set -e

if [ "$result" -lt 4000 ]; then
    timeout 5s docker system prune -f
fi

if ! docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "unsplit-cache"; then
    docker compose build cache
fi

docker compose build core
docker compose up -d -t 1 --build front
