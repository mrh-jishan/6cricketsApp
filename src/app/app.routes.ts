import {Routes} from '@angular/router';
import {CountdownComponent} from "./countdown/countdown.component";

export const routes: Routes = [
  {
    path: 'countdown',
    component: CountdownComponent
  },
  {
    path: '',
    redirectTo: 'countdown',
    pathMatch: 'full'
  },
];
