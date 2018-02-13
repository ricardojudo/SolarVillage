#!/bin/bash
CONTAINER_ID=solar-village
USER=$2
PASSWORD=$3
CREDENTIALS=$2:$3

URL=http://localhost:8080/kie-server/services/rest/server/containers/${CONTAINER_ID}/tasks/$1/states/claimed
echo "Claim task"
CURL="curl -X PUT -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash

URL=http://localhost:8080/kie-server/services/rest/server/containers/${CONTAINER_ID}/tasks/$1/states/started
echo "Start task"
CURL="curl -X PUT -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash