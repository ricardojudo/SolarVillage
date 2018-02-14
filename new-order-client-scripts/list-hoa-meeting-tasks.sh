#!/bin/bash
source ./set-env.sh


if [ $# -ne 1 ]; then
    echo "desc   : Retreive two list of tasks by potential and current owners"
    echo "usage  : $0 <pot-owner-groups>"
    echo "example: $0 sales"
    exit 1
fi

GROUPS=$1

echo "Potential owners"
URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/queries/tasks/instances/pot-owners?groups=$1
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi
echo ${CURL} | bash


echo "Owners"
URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/queries/tasks/instances/owners
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi
echo ${CURL} | bash
