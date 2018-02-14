# SolarVillage
Final Assigment for JBoss BMP Advanced course @ Mexico City
## Repository Organization
This repository contains the following modules

- **solar-village-domain-model**. Java based project with the domain model used by the business proccesses in BPMS.
- **new-order-permitting-jar**. JBoss BPMS project where the business proccesses are modeled with Business Central and, after building, is deployable on Kie Server.
- **goverment-services**. Ruby on Rails web application which implements the mock goverment services for permit requesting.
- **new-order-client-scripts** A set of shell scripts to start new orders and complete user tasks via Kie Server's REST API.


## Solar Village Domain model
The starting point for solving the assigment was to define a domain model which represents business data and behavior of the main entities identified on the requirements. The resulting models define the following Java classes in order to be used inside the business proccesses of the new-order-permitting-jar project.

### NewOrder
Represents new order entities which are created when the business process starts. For creating a `NewOrder` instance is required to define an address and if the house is in a condominum. If the new order is for a condominium then a `HoaMeeting` is also instanciated and associated to the `NewOrder` instance.

### HoaMeeting
When the new order is for a condominum, is necesary to attend to the corresponding Home Association Owners meeting in order to know if the installation is approved or not. For that reason the `HoaMeeting` class is defined in order to hold the date of the meeting and the final resolution reached in the meeting, in other words if the HOA aproves or denied the installation.

### PermitRequest
Whether or not the new order is for a condominuin, is mandatory to request some permits to the goverment. Those permit requests are modeled by the `PermitRequest` class which requires the address and permit type (electric or structural) in order to create new `PermitRequests` instances and invoke the goverment services API. 

Every permit request can be in one of the three states that are modeled as the enum `PermitRequest.State`

- `IN_PROGRESS`. Every new permit request is defined with this state until the permit is approved or denied.
- `APPROVED` and `DENIED`. Since the final resolution could take some time, several queries about the state of the permit can be made before the permit is approved or denied which are the final states of the process.


## New Order Permitting KJar and JBoss BPMS
For setting up this demo in a local evironment its required a JBoss BPMS installation with some configuration. Indeed the demo was built on VirtualBox environment provided in the BPMS Advanced course hence some specific configurations for the demo were defined upon that environment.
    
- It is necesary to define a group called _sales_ and at least one user who belongs to the _sales_ group. In my case, a user called _ricardojudo_ was defined.
- For the client invocations via REST API is required a kie-server container called _solar-village_. In this container the new-order-permitting kjar should be deployed.
- An SMTP resource is needed in order to send notifications. The simple SMPT server script and the settings of the _Human Task Escalation and Deadlines Lab_ were used for the development.

The whole repository can be cloned into Business Central in order to visualize and edit this project.

The JBoss BPMS project is composed by two business processes: NewOrderProcess and GovermentPermitRequest

### NewOrderProcess
Main process where the new orders are sent. Depending on whether the new order is for a condominium, the process continues to a human task which waits until a sales agent attends to the Home Owners Association where the installation is approved or not. That resolution is registered after the meeting by the sales agent and the process continues.  In case of HOA does not approves the process will end.

If the order is not for a condominium or the HOA approves the installation then the GovermentPermitRequest Proccess is started through a signal and the NewOrderProcess waits for the goverment resolution.

Finally the approvals are evaluated and registered and the process finalizes logging the result.

![alt NewOrderProcess](https://raw.githubusercontent.com/ricardojudo/SolarVillage/master/new-order-permitting-kjar/src/main/resources/ricardojudo/new_order_permitting_kjar/new-order-permitting-kjar.NewOrderProcess-svg.svg?sanitize=true)

#### Input Variables
- `address`. The address where the installation will be made.
- `condo`. Defines if the new order is for a condominium. Allowed values are `true` and `false`
- `hoaMeetingDate`. In case the new order is for a condominium the proccess needs the date of the HOA meeting in format `yyyy-MM-dd`

### Approval variables
- `hoaApproved`.  Whether or not HOA approves the installation
- `govPermitsApproved`. Whether or not the Goverment approves the installation
- `approved`. Whether or not the installation was approved by HOA and the goverment.

### GovermentPermitRequest
This process is started through a signal send by the NewOrderProcess. Both structural and electrical permit requests are sent in parallel and the process waits the results.

After every permit request is sent to the mock goverment services, there is a loop where every certain time the state of every request is retreived until the permits are approved or denied.

The next step is to send a signal back to the NewOrderProcess with the approval status of both permits. In case of one of the permits is denied the approval status is mark as false and a compensation activities are triggered, where the goverment services API is invoke for cancelling the previously requested permits.

![alt GovermentPermitRequest](https://raw.githubusercontent.com/ricardojudo/SolarVillage/master/new-order-permitting-kjar/src/main/resources/ricardojudo/new_order_permitting_kjar/new-order-permitting-kjar.GovermentPermitRequest-svg.svg?sanitize=true)

#### Input Variables
- `address`. The address for requesting the permits.


## Goverment Services
As it was mentioned before, Mock Goverment Services for requesting permits were implemented in a Ruby on Rails web application which defines an REST API with the following operations.

|Method |Path                               |Description                                                        |
|---    |---                                |---                                                                |
|POST   |/permit_requests/create_electrical |Create a new electric permit request                               |
|POST   |/permit_requests/create_structural |Create a new structura permit request                              |
|GET    |/permit_requests/{id}              |Retreive the status information for the permit identified by {id}  |
|DELETE |/permit_requests/{id}              |Cancel the permit identified by {id}                               |


For convinience, this application is deployed in Heroku and is accesible at https://solar-goverment-services.herokuapp.com/



## Client scripts
Once the project is build and deployed in a kie container called `solar-village`, is possible to create new orders, complete human tasks and retreive information through the client scripts. Every script contain curl invocations to the kie server API and allow different parameters depending on the action to be triggered. You can get some help when a script is executed without parameters.

### set-env
This script sets several variables used by the other scripts.

```
export KIE_SERVER_HOST=http://127.0.0.1:8080
export KIE_USER_NAME=ricardojudo
export KIE_PASSWORD=bpms
export KIE_CONTAINER_ID=solar-village
export CREDENTIALS=${KIE_USER_NAME}:${KIE_PASSWORD}
export PRINT_CURL_COMMAND=true
```


### container-status
Retreive information about the Kie Server, `solar-village` container and its definitions.

```sh
    ./container-status.sh
```


### post-new-order
Start a new order process instance. Requires 3 parameters: address, whether the order is for a condominium in boolean value (true|false) and the hoaMeetingDate in format yyyy-MM-dd.

```sh
    usage  : ./post-new-order.sh <address> <condominium true|false> <hoaMeetingDate (yyyy-MM-dd)>
    example: ./post-new-order.sh "25 Via Magna" true 2019-01-01
```

### list-new-orders
Retreive a list of new order process instances by the given status. This status is given as a single parameter. Valid status are:1=IN_PROGRESS, 2=COMPLETED, 3=ABORTED

```sh
    usage  : ./list-new-orders.sh <status 1=IN_PROGRESS 2=COMPLETED 3=ABORTED>
    example: ./list-new-orders.sh 1
```

### show-new-order
Show the information of a new order process instance. The desired process instance is specified by the id.

```sh
    usage  : ./show-new-order.sh <pInstanceId>
    example: ./show-new-order.sh 1
```

### delete-new-order
Abort a new order process instance specified by its id.

```
    usage  : ./delete-new-order.sh <pInstanceId>
    example: ./delete-new-order.sh 1
```

### list-hoa-meeting-tasks
Retreive two list of tasks by potential and current owners

```sh
    usage  : ./list-hoa-meeting-tasks.sh <pot-owner-groups>
    example: ./list-hoa-meeting-tasks.sh sales
```

### claim-hoa-meeting-task
Claim and start a HOA Meeting task

```sh   
    usage  : ./claim-hoa-meeting-task.sh <task_id>
    example: ./claim-hoa-meeting-task.sh 1
```

### complete-hoa-meeting-task
Complete a Hoa Meeting Task and set whether the order is approved or not

```sh
    usage  : ./complete-hoa-meeting-task.sh <task_id> <approved true|false>
    example: ./complete-hoa-meeting-task.sh 1 true
```

### show-hoa-meeting-task
Show the information of a HOA Meeting Task

```
    usage  : ./show-hoa-meeting-task.sh <taskId>
    example: ./show-hoa-meeting-task.sh 1
```