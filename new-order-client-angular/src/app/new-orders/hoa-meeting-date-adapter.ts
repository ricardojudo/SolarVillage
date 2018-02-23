import { Injectable } from "@angular/core";
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

/**
 * Example of a Native Date adapter
 */
@Injectable()
export class HoaMeetingDateAdapter extends NgbDateAdapter<String> {

  fromModel(date: String): NgbDateStruct {
    
    var _date = date ? date.split('-') : null
    return _date && _date.length === 3 ? {year: +_date[0], month: +_date[1]+1, day:+_date[2] }: null;
  }

  toModel(date: NgbDateStruct): String {
    var _date = null;
    if(date){
      var month = date.month;
      var day = date.day
      var _month = month < 10 ? `0${month}` : `${month}`
      var _day = day < 10 ? `0${day}` : `${day}`
      _date = date ? `${date.year}-${_month}-${_day}` : null;
    }
    return _date 
  }
}