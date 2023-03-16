import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkUserStatusSvgdf'
})
export class CheckUserStatusSvgdfPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "actif":
        return "M4.5 12.75l6 6 9-13.5";
      case "inactif":
        return "M6 18L18 6M6 6l12 12";
      default:
        return "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z";
    }
  }

}