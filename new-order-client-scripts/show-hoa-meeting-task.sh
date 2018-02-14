#!/bin/bash
source ./set-env.sh

if [ $# -ne 1 ]; then
    echo "desc   : Show the information of a HOA Meeting Task"
    echo "usage  : $0 <taskId>"
    echo "example: $0 1"
    exit 1
fi


URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/tasks/$1
echo "Task"
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi
echo ${CURL} | bash



URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/tasks/$1/contents/input
echo "Input vars task"
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi
echo ${CURL} | bash



URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/tasks/$1/contents/output
echo "Output vars task"
CURL="curl -X GET -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi
echo ${CURL} | bash