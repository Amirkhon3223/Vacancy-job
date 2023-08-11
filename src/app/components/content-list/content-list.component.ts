import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-list',
  template: `
    <h1 class="text-xl font-semibold mt-5">{{ title }}</h1>
    <ul class="list-disc pl-6">
      <li *ngFor="let item of items" class="text-gray-700 mt-2">{{ item }}</li>
    </ul>
  `,
})
export class ContentListComponent {
  @Input() title: string = '';
  @Input() items: string[] = [];
}
