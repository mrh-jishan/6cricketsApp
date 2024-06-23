import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription, switchMap} from "rxjs";
import {DeadlineService} from "../core/deadline.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [HttpClientModule],
  providers: [DeadlineService],
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

  constructor(private deadlineService: DeadlineService) {
  }

  ngOnInit(): void {
    this.subscription = this.deadlineService.getSecondsLeft().pipe(
      switchMap(data => {
        this.secondsLeft = data.secondsLeft;
        return interval(1000);
      })
    ).subscribe(() => {
      this.secondsLeft--;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
