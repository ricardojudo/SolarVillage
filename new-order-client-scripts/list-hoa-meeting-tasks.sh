#!/bin/bash
source ./set-env.sh
GROUPS=$1

echo "Potential owners"
URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/queries/tasks/instances/pot-owners?groups=$1
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
#echo ${CURL}
echo ${CURL} | bash


echo "Owners"
URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/queries/tasks/instances/owners
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
#echo ${CURL}
echo ${CURL} | bash
