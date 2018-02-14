#!/bin/bash
source ./set-env.sh

if [ $# -ne 1 ]; then
    echo "desc   : Show the information of a new order process instance"
    echo "usage  : $0 <pInstanceId>"
    echo "example: $0 1"
    exit 1
fi

URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/processes/instances/$1

echo "Process instance: $1"
CURL="curl -X GET -H \"Accept: application/json\" --user jboss:bpms ${URL}"
if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi
echo ${CURL} | bash


echo "Variables"
URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/queries/processes/instances/$1/variables/instances
#URL=${KIE_CONTAINER_HOST}/kie-server/services/rest/server/containers/${CONTAINER_ID}/processes/instances/$1/variables
CURL="curl -X GET -H \"Accept: application/json\" --user jboss:bpms ${URL}"
if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi
echo ${CURL} | bash