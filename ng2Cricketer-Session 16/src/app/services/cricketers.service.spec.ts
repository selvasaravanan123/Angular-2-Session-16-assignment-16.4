import { async, ComponentFixture, TestBed, getTestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CricketerService } from 'app/services/cricketer.service';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule,
  Response, ResponseOptions, RequestMethod
} from '@angular/http';
import { ICricketList } from 'app/interface/cricketer-list';

describe('CricketerService', () => {
  let mockBackend: MockBackend;

  // All heed this block - it is required so that the test injector
  // is properly set up. Without doing this, you won't get the
  // fake backend injected into Http.

  // Also, you need to inject MockBackend as a provider before you wire
  // it to replace XHRBackend with the provide function!  So this is all
  // extremely important to set up right.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CricketerService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));


  it('should get cricketerList', (done) => {
    let cricketerService: CricketerService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: [
                {
                  'firstName': 'Sachin',
                  'lastName': 'Tendulakar',
                  'favShot': 'Drive',
                  'playerType': 'Batsman',
                  'yearlyIncome': '1200000',
                  'dob': '1975-04-10'
                },
                {
                  'firstName': 'Rahul',
                  'lastName': 'Dravid',
                  'favShot': 'Pull',
                  'playerType': 'Batsman',
                  'yearlyIncome': '1600000',
                  'dob': '1971-04-10'
                }
              ]
            }
            )));
        });

      cricketerService = getTestBed().get(CricketerService);
      expect(cricketerService).toBeDefined();

      cricketerService.getCricketerList().subscribe((cricketerList: ICricketList[]) => {
        expect(cricketerList.length).toBeDefined();
        expect(cricketerList.length).toEqual(2);
        expect(cricketerList.length).not.toBe(1);
        done();
      });
    });
  });


  it('should check the service',
    inject([CricketerService], (service: CricketerService) => {
      expect(service).toBeTruthy();
    }));

  it('should get cricketList async',
    async(inject([CricketerService], (cricketerService: CricketerService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: [
                {
                  'firstName': 'Sachin',
                  'lastName': 'Tendulakar',
                  'favShot': 'Drive',
                  'playerType': 'Batsman',
                  'yearlyIncome': '1200000',
                  'dob': '1975-04-10'
                }]
            }
            )));
        });
      cricketerService.getCricketerList().subscribe(
        (response) => {
          expect(response.length).toBe(1);
          expect(response[0].favShot).toBe('Drive');
          expect(response[0].firstName).toBe('Sachin');
          expect(response).toEqual([{
            'firstName': 'Sachin',
            'lastName': 'Tendulakar',
            'favShot': 'Drive',
            'playerType': 'Batsman',
            'yearlyIncome': '1200000',
            'dob': '1975-04-10'
          }]);
        });
    })));



  it('should insert new cricketer',
    async(inject([CricketerService], (service: CricketerService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        connection.mockRespond(new Response(new ResponseOptions({ })));
        const contentType = connection.request.headers.get('Content-Type');
        expect(contentType).not.toBeNull();
        expect(contentType).toEqual('application/json');
        expect(connection.request.url).toBe('http://localhost:3000/api/addPlayers');
      });
      const cricketerDetail: ICricketList = {
        'firstName': 'Sachin',
        'lastName': 'Tendulakar',
        'favShot': 'Drive',
        'playerType': 'Batsman',
        'yearlyIncome': 1200000,
        'dob': '1975-04-10'
      };
      const result = service.addCricketer(cricketerDetail);
      result.subscribe(
        (successResult) => {
          console.log(successResult)
          expect(successResult).toBeDefined();
          expect(successResult).toEqual({});
        });
    })));
});
