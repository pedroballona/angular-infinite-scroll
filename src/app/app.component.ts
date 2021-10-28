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
    if (!this.isLoading) {
      this.isLoading = true;
      const newItems = await of(AppComponent.generateArray(10))
        .pipe(delay(1000))
        .toPromise();
      this.items = this.items.concat(newItems);
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
