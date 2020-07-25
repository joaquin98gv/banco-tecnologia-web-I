import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(image: string): string {
    if (!image || image === '') {
      return 'assets/images/isologo-azul.png';
    }
    if (image != null && image !== '') {
      return environment.urlImages + 'Files/' + image;
    } else {
      return 'assets/images/isologo-azul.png';
    }
    return null;
  }

}
