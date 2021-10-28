import { Component, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(InfiniteScrollComponent)
  scroll!: InfiniteScrollComponent;

  items = new Array(30).fill('Test');

  isLoading = false;

  async onLoadMore(): Promise<void> {
    if (!this.isLoading) {
      this.isLoading = true;
      const newItems = await of(new Array(10).fill('Test 2'))
        .pipe(delay(3000))
        .toPromise();
      this.items = this.items.concat(newItems);
      this.isLoading = false;
    }
  }
}
