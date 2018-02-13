#!/bin/bash
CONTAINER_ID=solar-village
PROCESS_DEFINITION=new-order-permitting-kjar.NewOrderProcess
#PROCESS_DEFINITION=new-order-permitting-kjar.NewOrder
USER=$2
PASSWORD=$3
CREDENTIALS=$2:$3
DATA="'{\"approved\":\"$4\"}'"


URL=http://localhost:8080/kie-server/services/rest/server/containers/${CONTAINER_ID}/tasks/$1/states/completed
echo "Complete"
CURL="curl -X PUT  -H \"Accept: application/json\" -H \"Content-Type: application/json\"  -d ${DATA} --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash