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
    const newOrders=
      [
        {id:1, initiator:"ricardo", startDate: new Date(), status: 1, address: "123 Lust Av", condominum: true, hoaMeetingDate: new Date()},
        {id:2, initiator:"ricardo_", startDate: new Date(), status: 1, address: "123 Wrath Av", condominum: false},
        {id:3, initiator:"ricardo__", startDate: new Date(), status: 2, address: "123 Envy Av", condominum: true, hoaMeetingDate: new Date()},
        {id:4, initiator:"ricardo_", startDate: new Date(), status: 2, address: "123 Pride Av", condominum: false},
        {id:5, initiator:"ricardo__", startDate: new Date(), status: 3, address: "123 L Av", condominum: true, hoaMeetingDate: new Date()},
        {id:6, initiator:"ricardo", startDate: new Date(), status: 3, address: "123 P Av", condominum: false}
      ]


    
    const hoaMeetingTasks=[
      {id: 2, status: "completed", owner: 'ricardojudo'},
      {id: 3, status: "in_progress", owner: 'ricardojudo'},
      {id: 1, status: "ready"},
      {id: 4, status: "ready"},
      {id: 5, status: "ready"},
      {id: 6, status: "ready"}
    ]
    return {newOrders, hoaMeetingTasks}//[newOrders, hoaMeetingTasks];
  }

}
