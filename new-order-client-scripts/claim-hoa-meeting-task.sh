#!/bin/bash
source ./set-env.sh

TASK_ID=$1

URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/tasks/$TASK_ID/states/claimed
echo "Claim task"
CURL="curl -X PUT -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
#echo ${CURL}
echo ${CURL} | bash

URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/tasks/$TASK_ID/states/started
echo "Start task"
CURL="curl -X PUT -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
#echo ${CURL}
echo ${CURL} | bash