#!/bin/bash

source ./set-env.sh
if [ $# -ne 1 ]; then
    echo "desc   : Abort a new order process instance"
    echo "usage  : $0 <pInstanceId>"
    echo "example: $0 1"
    exit 1
fi

URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/processes/instances/$1





echo "Process instance: $1"
CURL="curl -X DELETE -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi
echo ${CURL} | bash