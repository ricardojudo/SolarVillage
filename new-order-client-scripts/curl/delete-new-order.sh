#!/bin/bash

CONTAINER_ID=solar-village
PROCESS_DEFINITION=new-order-permitting-kjar.NewOrderProcess
URL=http://localhost:8080/kie-server/services/rest/server/containers/${CONTAINER_ID}/processes/instances/$1

echo "Process instance: $1"
CURL="curl -X DELETE -H \"Accept: application/json\" --user jboss:bpms ${URL}"
echo ${CURL}
echo ${CURL} | bash