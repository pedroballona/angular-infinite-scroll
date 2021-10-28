import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, throttleTime } from 'rxjs/operators';
import { InfiniteScrollItemDirective } from './directives/infinite-scroll-item.directive';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css'],
})
export class InfiniteScrollComponent implements OnInit, AfterContentInit {
  @ViewChild('wrapper', { static: true })
  private wrapperElementRef: ElementRef | undefined;

  @ContentChild(InfiniteScrollItemDirective)
  private itemDirective: InfiniteScrollItemDirective | undefined;

  @Input() isLoading = false;

  @Input()
  items: unknown[] = [];

  @Input() percentThreshold = 80;

  @Output() scrolledPastThreshold = new EventEmitter<void>();

  itemTemplate!: TemplateRef<unknown>;

  private wrapper!: HTMLElement;

  constructor(private ngZone: NgZone) {}

  ngAfterContentInit() {
    if (!this.itemDirective) {
      throw new Error('Set template');
    }

    this.itemTemplate = this.itemDirective.templateRef;
  }

  ngOnInit(): void {
    this.wrapper = this.wrapperElementRef!.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.wrapper, 'scroll')
        .pipe(
          map(() => this.getScrollPercentage()),
          distinctUntilChanged()
        )
        .subscribe((percentage) => {
          if (percentage >= this.percentThreshold) {
            this.ngZone.run(() => {
              this.scrolledPastThreshold.next();
            });
          }
        });
    });
  }

  getScrollPercentage(): number {
    return (
      (this.wrapper.scrollTop /
        (this.wrapper.scrollHeight - this.wrapper.clientHeight)) *
      100
    );
  }

  scrollToTop(): void {
    this.wrapper.scrollTop = 0;
  }
}
