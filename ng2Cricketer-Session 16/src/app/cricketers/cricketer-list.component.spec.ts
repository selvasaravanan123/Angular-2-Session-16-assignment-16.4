import { async, ComponentFixture, TestBed, getTestBed, inject } from '@angular/core/testing';

import { ICricketList } from 'app/interface/cricketer-list';
import { CricketersListComponent } from 'app/cricketers/cricketers-list.component';
import { CricketerService } from "app/services/cricketer.service";
import { DebugElement } from "@angular/core";

describe('CricketerList', () => {
  let component: CricketersListComponent;
  let fixture: ComponentFixture<CricketersListComponent>;
  // For Debugging HTML Elements
  let debug: DebugElement;
  let htmlElem: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CricketersListComponent], // Our Test sample component
    });
    // Get the ComponentFixture
    fixture = TestBed.createComponent(CricketersListComponent);
    component = fixture.componentInstance; // SampleComponent test instance
    // CSS Element selector
    htmlElem = debug.nativeElement;
  });


  // it('should get cricketerList', (done) => {

  // });

  // it('should get cricketList async', () => {

  // });

});
