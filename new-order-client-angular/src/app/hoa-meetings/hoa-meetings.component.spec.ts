import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoaMeetingsComponent } from './hoa-meetings.component';

describe('HoaMeetingsComponent', () => {
  let component: HoaMeetingsComponent;
  let fixture: ComponentFixture<HoaMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoaMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoaMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
