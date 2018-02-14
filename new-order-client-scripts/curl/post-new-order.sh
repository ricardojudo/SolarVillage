#!/bin/bash


CONTAINER=http://0.0.0.0:8080/kie-server/services/rest/server/containers/solar-village

URL=${CONTAINER}/processes/new-order-permitting-kjar.NewOrderProcess/instances
#URL=${CONTAINER}/processes/new-order-permitting-kjar.NewOrder/instances
DATA="'{\"address\":\"$1\", \"condo\":\"$2\", \"hoaMeetingDate\":\"$3\"}'"

#echo "URL: ${URL}"
#echo "DATA: ${DATA}"

CURL="curl -X POST -H \"Accept: application/json\" -H \"Content-Type: application/json\" --user jboss:bpms -d ${DATA} ${URL}"

echo ${CURL} | bash