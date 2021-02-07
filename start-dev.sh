#!/usr/bin/env bash

#################################
## Run application in DEV mode ##
#################################


started_at=$(date +"%s")
export DOCKER_CLIENT_TIMEOUT=220
export COMPOSE_HTTP_TIMEOUT=220

echo "-----> Provisioning containers"
docker-compose --file docker-compose-dev.yaml up -d
echo ""

web=$(docker-compose --file docker-compose-dev.yaml ps -q server-dev) 

# Run Sequalize's migrations.
echo "-----> Running application migrations"
docker exec -it "$web" sequelize db:migrate
echo ""

# Run Sequalize's seeds.
echo "-----> Running application seeds"
docker exec -it "$web" sequelize db:seed:all
echo "<----- Seeds created"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
