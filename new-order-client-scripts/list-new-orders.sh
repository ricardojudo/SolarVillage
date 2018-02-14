#!/bin/bash
source ./set-env.sh


PROCESS_DEFINITION=new-order-permitting-kjar.NewOrderProcess
URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/queries/processes/${PROCESS_DEFINITION}/instances?status=$1

#Status 1=IN_PROGRESS 2=COMPLETED 3=ABORTED

CURL="curl -X GET -H \"Accept: application/json\" --user jboss:bpms ${URL}"

echo "CURL: ${CURL}"
echo ${CURL} | bash