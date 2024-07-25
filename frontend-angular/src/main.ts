import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import routes from "./app/app.routes";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes), provideAnimationsAsync()
  ]
})
  .catch(err => console.error(err));
