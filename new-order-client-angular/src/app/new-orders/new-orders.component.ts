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
    /*this.newOrders = [
      {id:1, initiator:"ricardo", startDate: new Date(), status: state,condominum: true},
      {id:2, initiator:"ricardo1", startDate: new Date(), status: state,},
      {id:3, initiator:"ricardo2", startDate: new Date(), status: state, condominum: true,},
      {id:4, initiator:"ricardo3", startDate: new Date(), status: state,}
    ];
    */
    this.newOrdersService.getNewOrders(state).subscribe((rawRecords) =>{
      //console.log(rawRecords);
      this.newOrders = rawRecords;
    }
    
  );


  }

  isInProgress(){
    return +this.newOrderStatus === 1;
  }

  abort(){
    this.newOrdersService.deleteNewOrder(this.selectedOrder.id).subscribe(()=>{
      this.newOrderStatus=3;
      this.isNewOrderFormShown=false;
      this.newOrder=null;
      this.getNewOrders(3);
    });
  }

  showDetail(newOrder:NewOrder){
    //TODO Get details from service in async form
    this.newOrdersService.showNewOrder(newOrder.id).subscribe((_newOrder) =>{
      this.selectedOrder = newOrder;  
    });
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
    this.newOrdersService.createNewOrder(this.newOrder).subscribe(()=>{
      this.newOrderStatus = 2;
      this.getNewOrders(2);
      this.cancelNewOrder();
    });
    
  }

}
