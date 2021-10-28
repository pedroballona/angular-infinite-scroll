import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { InfiniteScrollItemDirective } from './infinite-scroll/directives/infinite-scroll-item.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollComponent,
    InfiniteScrollItemDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
