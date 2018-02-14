#!/bin/bash

source ./set-env.sh

URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}/processes/instances/$1

echo "Process instance: $1"
CURL="curl -X DELETE -H \"Accept: application/json\" --user ${CREDENTIALS} ${URL}"
#echo ${CURL}
echo ${CURL} | bash