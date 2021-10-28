import { Component, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { Chance } from 'chance';

let id = 0;

const chance = new Chance();

interface Person {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(InfiniteScrollComponent)
  scroll!: InfiniteScrollComponent;

  trackBy = (_index: number, item:Person) => {
    return item.id;
  };

  items = AppComponent.generateArray(20);

  isLoading = false;

  async onLoadMore(): Promise<void> {
    // this method will be called more than one time it's necessary to only get the next page 
    // if a page is already not loading
    if (!this.isLoading) {
      this.isLoading = true;
      // simulates api call that returns the next page
      const newItems = await of(AppComponent.generateArray(10))
        .pipe(delay(1000))
        .toPromise();
      this.items = this.items.concat(newItems);
      // remember to disable loading
      this.isLoading = false;
    }
  }

  private static generateArray(size: number): Person[] {
    return Array.from(new Array(size), () => ({
      id: id++,
      name: chance.name(),
    }));
  }
}
