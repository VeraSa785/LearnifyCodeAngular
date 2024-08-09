import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import routes from "./app/app.routes";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ]
})
  .catch(err => console.error(err));
