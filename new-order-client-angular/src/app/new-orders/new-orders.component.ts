import { Component, OnInit } from '@angular/core';
import { NewOrder } from "../models/new-order";

import { NewOrdersService } from "../services/new-orders.service";

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {

  newOrderStatus=2;
  isNewOrderFormShown=false;
  newOrder:NewOrder;

  status = {"in_progress": 1, "completed": 2, "aborted": 3}

  selectedOrder: NewOrder;

  newOrders: NewOrder[]

  constructor(private newOrdersService: NewOrdersService) { }

  ngOnInit() {
    this.getNewOrders(2);
  }

  getNewOrders(state){
    this.selectedOrder = null;
    this.newOrders = [
      {id:1, initiator:"ricardo", startDate: new Date(), state: state,condominum: true},
      {id:2, initiator:"ricardo1", startDate: new Date(), state: state,},
      {id:3, initiator:"ricardo2", startDate: new Date(), state: state, condominum: true,},
      {id:4, initiator:"ricardo3", startDate: new Date(), state: state,}
    ];
  }

  isInProgress(){
    return +this.newOrderStatus === 1;
  }

  abort(){
    alert(`abort condominium: ${this.selectedOrder.condominum}`);
  }

  showDetail(newOrder:NewOrder){
    //TODO Get details from service in async form

    newOrder.address = "30 Nogales";
   
    newOrder.govApproved = false;
    newOrder.hoaApproved = true;
    newOrder.hoaMeetingDate = new Date();

    this.selectedOrder = newOrder;  
  }

  showNewOrderForm(){
    this.isNewOrderFormShown=true;
    this.newOrder=new NewOrder();
  }

  cancelNewOrder(){
    this.isNewOrderFormShown=false;
    this.newOrder=null;
  }

  submitNewOrder(){
    alert(this.newOrder);
    this.cancelNewOrder();
  }

}
