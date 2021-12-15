import {Pipe, PipeTransform} from '@angular/core';
import translation from '../../assets/lang/ukr.json';

@Pipe({
  name: 'translate'
})
export class Translations implements PipeTransform {
  transform(value: string): string {
    // @ts-ignore
    return translation[value];
  }
}
