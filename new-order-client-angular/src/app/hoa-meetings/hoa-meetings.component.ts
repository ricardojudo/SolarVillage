import { Component, OnInit } from '@angular/core';

import { HoaMeeting } from "../models/hoa-meeting";

import { HoaMeetingsService } from "../services/hoa-meetings.service";

@Component({
  selector: 'app-hoa-meetings',
  templateUrl: './hoa-meetings.component.html',
  styleUrls: ['./hoa-meetings.component.css']
})
export class HoaMeetingsComponent implements OnInit {

  shownTasks = 0;

  hoaMeetings: HoaMeeting[];
  selectedMeeting: HoaMeeting;

  constructor(private hoaMeetingService: HoaMeetingsService) { }

  ngOnInit() {
    this.getHoaMeetings();
  }


  getHoaMeetings(){
    this.selectedMeeting = null;
    this.hoaMeetings = [
      {id: 2, status: "completed", owner: 'ricardojudo'},
      {id: 3, status: "in_progress", owner: 'ricardojudo'}
    ];
  }
  
  getPotentialMeetings(){
    this.selectedMeeting = null;
    this.hoaMeetings = [
      {id: 1, status: "ready"},
      {id: 4, status: "ready"},
      {id: 5, status: "ready"}
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
