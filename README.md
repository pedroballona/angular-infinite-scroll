# angular-infinite-scroll

This repository shows how to implement a infinite scroll component on angular. The component is implemented in [here](./src/app/infinite-scroll/infinite-scroll.component.ts) and an example of use is shown [here](./src/app/app.component.html)


## Infinite Scroll Component

```html
<app-infinite-scroll
    items="any[]"
    (scrolledPastThreshold)="EventEmmiter<void>"
    isLoading="boolean"
    trackBy="Function"
    wrapperClass='string | string[]'
  >
    <ng-template appInfiniteScrollItem let-item>
      <div class="item">
        {{ item }}
      </div>
    </ng-template>
</app-infinite-scroll>
```

### Propriedades


| Name                    | Type                 | Default Value | Description                                                                                                                                                                                                                                                                          |
|-------------------------|----------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `items`                 | `any[]`              | `[]`          | An array of items that will be provided to the template marked with the directive `appInfiniteScrollItem` in the default variable "item" (view the example).                                                                                                                         |
| `scrolledPastThreshold` | `EventEmitter<void>` | -             | This event is emmitted every time the user scrolls past the `percentThreshold`. This event can be fired many times make sure to only call the data provider API only if the application isn't loading a page already otherwise the api will be called many times (view the example). |
| `percentThreshold`      | `number`             | `80`          | The minimum percetange of the height of the element before the `scrolledPastThreshold` begins to be called.                                                                                                                                                                          |
| `isLoading`             | `boolean`            | `false`       | When true will show a loading spinner as the last element of the list                                                                                                                                                                                                                |
| `trackBy`               | `Function`           | -             | **Required**. A trackBy function to be used with the ngFor inside the component                                                                                                                                                                                                      |
| `wrapperClass`          | `string \| string[]` | -             | Classes to be added to the wrapper element                                                                                                                                                                                                                                           |