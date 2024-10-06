import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  private maxLength = 30;
  private regex: RegExp = new RegExp(/^[a-zA-Z]*$/);

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^0-9]/g, '');

    input.value = value;
  }
}