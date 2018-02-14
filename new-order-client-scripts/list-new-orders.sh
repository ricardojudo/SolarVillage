#!/bin/bash
source ./set-env.sh
if [ $# -ne 1 ]; then
    echo "desc   : Retreive a list of new order process instances by the given status."
    echo "usage  : $0 <status 1=IN_PROGRESS 2=COMPLETED 3=ABORTED>"
    echo "example: $0 1"
    exit 1
fi

PROCESS_DEFINITION=new-order-permitting-kjar.NewOrderProcess
URL=${KIE_SERVER_HOST}/kie-server/services/rest/server/queries/processes/${PROCESS_DEFINITION}/instances?status=$1

#Status 1=IN_PROGRESS 2=COMPLETED 3=ABORTED


CURL="curl -X GET -H \"Accept: application/json\" --user jboss:bpms ${URL}"

if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi
echo ${CURL} | bash