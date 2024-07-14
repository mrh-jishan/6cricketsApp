import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription, switchMap} from "rxjs";
import {DeadlineService} from "../core/deadline.service";

@Component({
  selector: 'app-countdown',
  standalone: true,
  template: `
    <div class="countdown">Seconds left to deadline: {{ secondsLeft }}</div>
  `,
  styles: `
    .countdown {
      font-size: 20px;
      font-weight: bold;
    }
  `
})
export class CountdownComponent implements OnInit, OnDestroy {

  secondsLeft: number = 0;
  subscription: Subscription;

  constructor(private deadlineService: DeadlineService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscription = this.deadlineService.getSecondsLeft().pipe(
      switchMap(data => {
        this.secondsLeft = data.secondsLeft;
        this.cdr.detectChanges();
        return interval(1000);
      })
    ).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.cdr.detectChanges();
      } else if (this.subscription) {
        this.subscription.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
