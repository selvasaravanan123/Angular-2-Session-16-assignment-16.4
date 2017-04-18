import { ICricketList } from './../interface/cricketer-list';
import { Component, OnInit, trigger, state, animate, transition, style, keyframes, group } from '@angular/core';
import { CricketerService } from 'app/services/cricketer.service';
import { Observable } from 'rxjs/Observable';

declare const alertify: any;

@Component({
  /**Other meta-data */
  selector: 'app-cricketers-list',
  templateUrl: './cricketers-list.component.html',
  styleUrls: ['./cricketers-list.component.css'],
  animations: [
    trigger('crciketerState',
      [
        state('inactive', style({
          backgroundColor: '#fff',
          transform: 'scale(1)'
        })),
        state('active', style({
          backgroundColor: '#cfd8dc',
          transform: 'scale(1.1)'
        })),
        transition('inactive => active', animate('500ms ease-in')),
        transition('active => inactive', animate('500ms ease-out'))
      ]
    ),
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition(':leave', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.100s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ])
    ])
  ]
})
export class CricketersListComponent implements OnInit {

  criketerDetail: Observable<ICricketList[]> | any[];
  private searchData: string;
  private imageUrl: string = 'https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg';
  stateExpression: string;
  /** Using constructor, call the cricketService.
      this shorthand syntax automatically creates and
      initializes a new private member in the class */
  constructor(private _cricketService: CricketerService) { }


  ngOnInit() {
    this.searchData = '';
    /**Get the cricketerDetail from cricketer-app  */
    this.criketerDetail = this._cricketService.getCricketerList();
    this.inactiveState();
  };

  deleteData(cricketId) {
    this._cricketService.deleteCricketer(cricketId).subscribe(data => {
      /**Using 3rd party library to show message. */
      alertify.notify(' Deleted Successfully', 'success', 2);
      this.criketerDetail = this._cricketService.getCricketerList();
    },
      error => console.log(error));
  };
  mouseEnter() {
    this.activeState();
  };

  mouseLeave() {
    this.inactiveState();
  };

  inactiveState() { this.stateExpression = 'inactive'; }
  activeState() { this.stateExpression = 'active'; }

  animationStarted(e) {
    console.log('Animation Started', e)
  }

  animationDone(e) {
    console.log('Animation Done', e)
  }

}
