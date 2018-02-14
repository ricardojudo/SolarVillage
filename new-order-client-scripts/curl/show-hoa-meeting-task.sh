#!/bin/bash
CONTAINER_ID=solar-village
USER=$2
PASSWORD=$3
CREDENTIALS=$2:$3


URL=http://localhost:8080/kie-server/services/rest/server/containers/${CONTAINER_ID}/tasks/$1
echo "Task"
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash



URL=http://localhost:8080/kie-server/services/rest/server/containers/${CONTAINER_ID}/tasks/$1/contents/input
echo "Input vars task"
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash



URL=http://localhost:8080/kie-server/services/rest/server/containers/${CONTAINER_ID}/tasks/$1/contents/output
echo "Output vars task"
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash