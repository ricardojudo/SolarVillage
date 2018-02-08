CONTAINER=http://0.0.0.0:8080/kie-server/services/rest/server/queries/containers/solar-village/process/instances

URL=${CONTAINER}/processes


curl -X GET -H "Accept: application/json" --user jboss:bpms http://localhost:8080/kie-server/services/rest/server/queries/containers/solar-village/process/instances


CURL="curl -X GET -H \"Accept: application/json\" -H \"Content-Type: application/json\" --user jboss:bpms -d  ${URL}"

echo ${CURL} | bash