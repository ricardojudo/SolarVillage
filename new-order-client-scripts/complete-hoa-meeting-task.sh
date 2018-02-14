#!/bin/bash

source ./set-env.sh

TASK_ID=$1
DATA="'{\"approved\":\"$2\"}'"

URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/tasks/$TASK_ID/states/completed


echo "Complete task"
CURL="curl -X PUT  -H \"Accept: application/json\" -H \"Content-Type: application/json\"  -d ${DATA} --user ${CREDENTIALS} ${URL}"
#echo ${CURL}
echo ${CURL} | bash