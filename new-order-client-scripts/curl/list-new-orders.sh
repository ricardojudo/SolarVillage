#!/bin/bash

CONTAINER_ID=solar-village
PROCESS_DEFINITION=new-order-permitting-kjar.NewOrderProcess
#URL=http://localhost:8080/kie-server/services/rest/server/queries/containers/${CONTAINER_ID}/process/instances
URL=http://localhost:8080/kie-server/services/rest/server/queries/processes/${PROCESS_DEFINITION}/instances?status=$1

#Status 1=IN_PROGRESS 2=COMPLETED 3=ABORTED

CURL="curl -X GET -H \"Accept: application/json\" --user jboss:bpms ${URL}"

echo "CURL: ${CURL}"
echo ${CURL} | bash