#!/bin/bash
CONTAINER_ID=solar-village
PROCESS_DEFINITION=new-order-permitting-kjar.NewOrderProcess
GROUPS=$1
USER=$2
PASSWORD=$3
CREDENTIALS=$2:$3


echo "Potential owners"
URL=http://localhost:8080/kie-server/services/rest/server/queries/tasks/instances/pot-owners?groups=$1
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash


echo "Owners"
URL=http://localhost:8080/kie-server/services/rest/server/queries/tasks/instances/owners
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
echo ${CURL}
echo ${CURL} | bash
