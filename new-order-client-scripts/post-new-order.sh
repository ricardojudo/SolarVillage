#!/bin/bash

source ./set-env.sh

if [ $# -ne 3 ]; then
    echo "desc   :  Start a new order process instance"
    echo "usage  : $0 <address> <condominium true|false> <hoaMeetingDate (yyyy-MM-dd)>"
    echo "example: $0 \"25 Via Magna\" true 2019-01-01"
    exit 1
fi


CONTAINER=${KIE_SERVER_HOST}/kie-server/services/rest/server/containers/${KIE_CONTAINER_ID}
URL=${CONTAINER}/processes/new-order-permitting-kjar.NewOrderProcess/instances
DATA="'{\"address\":\"$1\", \"condo\":\"$2\", \"hoaMeetingDate\":\"$3\"}'"

CURL="curl -X POST -H \"Accept: application/json\" -H \"Content-Type: application/json\" --user ${CREDENTIALS} -d ${DATA} ${URL}"

if [ ${PRINT_CURL_COMMAND} == 'true' ]; then
  echo $CURL
fi

echo ${CURL} | bash