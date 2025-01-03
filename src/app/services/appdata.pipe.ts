import { Pipe, PipeTransform } from "@angular/core";
import { getValue } from '../../assets/json/index.js'

@Pipe({
    name: 'AppDataPipe'
})
export class AppDataPipe implements PipeTransform {

    transform(value: any): any {
        if (value === '' || value === undefined) {
            return '';
        } else {
            return getValue(value) ? getValue(value) : value;
        }
    }

}