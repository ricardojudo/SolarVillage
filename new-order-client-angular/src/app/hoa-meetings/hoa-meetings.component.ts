import { Component, OnInit } from '@angular/core';

import { HoaMeeting } from "../models/hoa-meeting";

@Component({
  selector: 'app-hoa-meetings',
  templateUrl: './hoa-meetings.component.html',
  styleUrls: ['./hoa-meetings.component.css']
})
export class HoaMeetingsComponent implements OnInit {

  shownTasks = 0;

  hoaMeetings: HoaMeeting[];
  selectedMeeting: HoaMeeting;

  constructor() { }

  ngOnInit() {
    this.getHoaMeetings();
  }


  getHoaMeetings(){
    this.hoaMeetings = [
      {id: 1, status: "ready"},
      {id: 2, status: "completed"},
      {id: 3, status: "in_progress"}
    ];
  }

  showDetail(hoaMeeting){
    this.selectedMeeting = hoaMeeting;
  }

  claim(){

  }
  complete(){
    alert(this.selectedMeeting.approved);
  }

}
