import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CountdownComponent} from './countdown.component';
import {of} from 'rxjs';
import {ChangeDetectorRef} from "@angular/core";
import {DeadlineService} from "../core/deadline.service";


class MockDeadlineService {
  getSecondsLeft() {
    return of({secondsLeft: 10});
  }
}

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownComponent], // Importing the standalone component
      providers: [
        { provide: DeadlineService, useClass: MockDeadlineService },
        ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize secondsLeft from the service', () => {
    expect(component.secondsLeft).toBe(10);
  });

  it('should decrement secondsLeft every second and stop at zero', fakeAsync(() => {
    component.ngOnInit();
    expect(component.secondsLeft).toBe(10);

    // Simulate 11 seconds passing
    tick(10000); // 10 seconds
    fixture.detectChanges();
    expect(component.secondsLeft).toBe(0);

    tick(1000); // 1 more second to check it stops at zero
    fixture.detectChanges();
    expect(component.secondsLeft).toBe(0);

    component.ngOnDestroy();
  }));

  afterEach(() => {
    component.ngOnDestroy();
  });
});
