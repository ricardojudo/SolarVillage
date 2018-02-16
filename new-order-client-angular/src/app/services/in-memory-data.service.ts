import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable()
export class InMemoryDataService implements InMemoryDataService{

  constructor() { }


  createDb() {
    /*
    const processInstances = {
      "process-instance" : [ {
        "initiator" : "ricardojudo",
        "process-instance-id" : 4,
        "process-id" : "new-order-permitting-kjar.NewOrderProcess",
        "process-name" : "NewOrderProcess",
        "process-version" : "1.2",
        "process-instance-state" : 1,
        "container-id" : "ricardojudo:new-order-permitting-kjar:1.1.6",
        "start-date" : 1518630168000,
        "process-instance-desc" : "NewOrderProcess",
        "correlation-key" : "",
        "parent-instance-id" : -1
      }, {
        "initiator" : "ricardojudo",
        "process-instance-id" : 6,
        "process-id" : "new-order-permitting-kjar.NewOrderProcess",
        "process-name" : "NewOrderProcess",
        "process-version" : "1.2",
        "process-instance-state" : 2,
        "container-id" : "ricardojudo:new-order-permitting-kjar:1.1.6",
        "start-date" : 1518630232000,
        "process-instance-desc" : "NewOrderProcess",
        "correlation-key" : "",
        "parent-instance-id" : -1
      }, {
        "initiator" : "ricardojudo",
        "process-instance-id" : 8,
        "process-id" : "new-order-permitting-kjar.NewOrderProcess",
        "process-name" : "NewOrderProcess",
        "process-version" : "1.2",
        "process-instance-state" : 3,
        "container-id" : "solar-village",
        "start-date" : 1518630656000,
        "process-instance-desc" : "NewOrderProcess",
        "correlation-key" : "",
        "parent-instance-id" : -1
      } ]
    }
    */
    const foo = [];
    return foo;
  }

}
