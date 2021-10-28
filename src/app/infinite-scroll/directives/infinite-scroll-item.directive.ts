import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appInfiniteScrollItem]'
})
export class InfiniteScrollItemDirective {

  constructor(public templateRef: TemplateRef<unknown>) { }

}
