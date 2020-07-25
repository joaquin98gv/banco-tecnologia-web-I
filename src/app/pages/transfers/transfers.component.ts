import { Component, OnInit } from '@angular/core';
import { ClienteService, CuentaService, TransaccionService } from '../../services/service.index';
import { Result } from '../../models/result.model';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [];

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {

  user = '';
  cargandoData = true;
  cliente;
  transacciones;

  displayedColumns: string[] = ['tipo', 'monto', 'fregistro', 'descripcion', 'clientedestino'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

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
        this.cargandoData = false;
      } else {
        toastrS.error(x.msg);
      }
    });
  }

  ngOnInit(): void {
  }

  obtenerTransacciones(){
    this.transaccionS.GetTransacciones(this.cliente.IdCuenta).subscribe((x: Result) => {
      console.log(x.data);
      if (x.status === 200) {
        this.transacciones = x.data;
        this.dataSource = x.data;
      }else{
        this.toastrS.error(x.msg);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
