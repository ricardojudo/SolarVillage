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
    /*this.hoaMeetings = [
      {id: 2, status: "completed", owner: 'ricardojudo'},
      {id: 3, status: "in_progress", owner: 'ricardojudo'}
    ];*/
    this.hoaMeetingService.getOwnedHoaMeetings().subscribe((_hoaMeetings)=>{
      this.hoaMeetings = _hoaMeetings;
    })
  }
  
  getPotentialMeetings(){
    this.selectedMeeting = null;
    /*this.hoaMeetings = [
      {id: 1, status: "ready"},
      {id: 4, status: "ready"},
      {id: 5, status: "ready"}
    ];*/
    this.hoaMeetingService.getPotentialHoaMeetings().subscribe((_hoaMeetings)=>{
      this.hoaMeetings = _hoaMeetings;
    })
  }


  showDetail(hoaMeeting){
    this.hoaMeetingService.showDetail(hoaMeeting).subscribe((_hoaMeeting)=>{
      this.selectedMeeting = _hoaMeeting;
    })
  }

  claim(){
    this.hoaMeetingService.claim(this.selectedMeeting).subscribe(()=>{
      this.shownTasks = 0;
      this.getHoaMeetings();
      this.selectedMeeting = null;
    })
  }
  complete(){
    this.hoaMeetingService.complete(this.selectedMeeting).subscribe(()=>{
      this.getHoaMeetings();
      this.selectedMeeting = null;
    });
  }

}
