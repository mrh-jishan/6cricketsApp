import { TestBed } from '@angular/core/testing';

import { DeadlineService } from './deadline.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('DeadlineService', () => {
  let service: DeadlineService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeadlineService]
    });
    service = TestBed.inject(DeadlineService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch seconds left from the API', () => {
    const dummyResponse = { secondsLeft: 100 };

    service.getSecondsLeft().subscribe(response => {
      expect(response.secondsLeft).toBe(100);
    });

    const req = httpMock.expectOne('/api/deadline');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

});
