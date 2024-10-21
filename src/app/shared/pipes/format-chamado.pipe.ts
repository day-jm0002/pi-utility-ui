import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatChamado'
})
export class FormatChamadoPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return value;

    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})$/);
    
    if (match) {
      return `R${match[1]} ${match[2]} ${match[3]}`;
    }
    
        return value;
  }

}
