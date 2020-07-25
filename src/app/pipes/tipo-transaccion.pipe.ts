import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoTransaccion'
})
export class TipoTransaccionPipe implements PipeTransform {

  transform(items: any[], idTipoTrans): any {
    if (!items || !idTipoTrans) {
        return items;
    }
    return items.filter(i => i.IdTipoTransaccion == idTipoTrans);
}

}
