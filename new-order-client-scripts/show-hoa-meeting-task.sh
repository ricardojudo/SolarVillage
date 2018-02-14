#!/bin/bash
source ./set-env.sh



URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/tasks/$1
echo "Task"
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash



URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/tasks/$1/contents/input
echo "Input vars task"
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash



URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/tasks/$1/contents/output
echo "Output vars task"
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash