import { Component, OnInit } from '@angular/core';
import { ClienteService, CuentaService, TransaccionService } from '../../services/service.index';
import { Result } from '../../models/result.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = '';
  cargandoData = true;
  cliente;
  transacciones;

  cantIngreso = 0;
  cantEgreso = 0;
  porIngreso = 0;
  porEgreso = 0;

  constructor(  private clienteS: ClienteService,
                private toastrS: ToastrService,
                private cuentaS: CuentaService,
                private transaccionS: TransaccionService  ) {
    const dataUser = JSON.parse(localStorage.getItem('user_tw1'));
    clienteS.getCliente(dataUser.id).subscribe((x: Result) => {
      if (x.status === 200) {
        this.cliente = x.data;
        if (this.cliente.IdCuenta != null) {
          this.obtenerTransacciones();
        }
      } else {
        toastrS.error(x.msg);
      }
    });
  }

  ngOnInit(): void {
  }

  crearCuenta(){
    this.cuentaS.crearCuenta(this.cliente).subscribe((x: Result) => {
      if (x.status === 200) {
        this.toastrS.success(x.msg);
        location.reload();
      }else{
        this.toastrS.error(x.msg);
      }
    });
  }

  obtenerTransacciones(){
    this.transaccionS.GetTransacciones(this.cliente.IdCuenta).subscribe((x: Result) => {
      console.log(x.data);
      if (x.status === 200) {
        this.transacciones = x.data;
        this.propiedadesCalculadas();
        this.cargandoData = false;
      }else{
        this.toastrS.error(x.msg);
      }
    });
  }

  propiedadesCalculadas(){
    this.cantIngreso = this.calcIngresos();
    this.cantEgreso = this.calcEgresos();
    if (this.cantIngreso > this.cantEgreso) {
      this.porIngreso = 100;
      this.porEgreso = (this.cantEgreso / this.cantIngreso) * 100;
    }else{
      this.porEgreso = 100;
      this.porEgreso = (this.cantIngreso / this.cantEgreso) * 100;
    }
  }

  calcIngresos(): number {
    let cant = 0;
    (this.transacciones.filter(i => i.IdTipoTransaccion == 1)).forEach(x => {
      cant += Number(x.Monto);
    });
    return cant;
  }

  calcEgresos(): number {
    let cant = 0;
    (this.transacciones.filter(i => i.IdTipoTransaccion == 2)).forEach(x => {
      cant += Number(x.Monto);
    });
    return cant;
  }

}
