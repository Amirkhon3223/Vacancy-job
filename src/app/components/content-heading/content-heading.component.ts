import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-content-heading',
    template: `<h3 class="text-xl font-semibold mt-5">{{ title }}</h3>
    <p class="mt-2">{{describe}}</p>
    `
})
export class ContentHeadingComponent {
    @Input() title: string = '';
    @Input() describe: string = '';
}
