import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTextOnly]',
  standalone: true,
})
export class TextOnlyDirective {
  private maxLength = 30;
  private regex: RegExp = new RegExp(/^[a-zA-Z\s]*$/); // Aceptar letras y espacios

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remover caracteres que no son letras
    if (!this.regex.test(value)) {
      value = value.replace(/[^a-zA-Z\s]+/g, ''); // Reemplazar cualquier cosa que no sea letras o espacios
    }

    // Limitar la longitud del texto
    if (value.length > this.maxLength) {
      value = value.substring(0, this.maxLength);
    }

    input.value = value;
  }
}