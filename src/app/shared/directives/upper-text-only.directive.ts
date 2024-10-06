import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUpperTextOnly]',
  standalone: true,
})
export class UpperTextOnlyDirective {
  private maxLength = 30;
  private regex: RegExp = new RegExp(/^[a-zA-Z]*$/);

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Convertir a mayúsculas
    value = value.toUpperCase();

    // Remover caracteres que no son letras
    if (!this.regex.test(value)) {
      value = value.replace(/[^A-Z]+/g, '');  // Modificado para solo permitir letras mayúsculas
    }

    // Limitar la longitud del texto
    if (value.length > this.maxLength) {
      value = value.substring(0, this.maxLength);
    }

    input.value = value;
  }
}