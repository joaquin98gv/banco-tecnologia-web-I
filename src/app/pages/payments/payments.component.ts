import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { TransaccionService, ClienteService, CuentaService } from '../../services/service.index';
import { Result } from '../../models/result.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ValidadorsService } from '../../services/validadors.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  formulario: FormGroup;
  dataUser = JSON.parse(localStorage.getItem('user_tw1'));
  cliente;
  cargandoData = true;
  lDestinatario = [];
  constructor(  private fb: FormBuilder,
                private toastrS: ToastrService,
                private route: Router,
                private transaccionS: TransaccionService,
                private clienteS: ClienteService,
                private cuentaS: CuentaService  ) {
                  clienteS.getCliente(this.dataUser.id).subscribe((x: Result) => {
                    console.log(x);
                    if (x.status === 200) {
                      this.cliente = x.data;
                      this.cargarData();
                      this.crearFormulario();
                    } else {
                      toastrS.error(x.msg);
                    }
                  });
                }

  ngOnInit(): void {
  }

  cargarData(){
    this.clienteS.getClientes().subscribe((x: Result) => {
      console.log(x);
      if (x.status === 200) {
        this.lDestinatario = x.data.filter(i => i.IdCuenta != null && i.Id !== this.dataUser.id);
        this.cargandoData = false;
      } else {
        this.toastrS.error(x.msg);
      }
    });
  }

  crearFormulario(){
    this.formulario = this.fb.group({
      Id: [null],
      IdTipoTransaccion: [2],
      Monto: [, [Validators.required, Validators.min(1), Validators.max(Number(this.cliente.Monto))] ],
      Descripcion: [''],
      IdCuenta: [Number(this.cliente.IdCuenta)],
      IdDestino: [, Validators.required]
    });
  }

  guardar(){
    if (this.formulario.valid) {
      this.cuentaS.enviarPago(this.formulario.value).subscribe((x: Result) => {
        if (x.status === 200) {
          this.toastrS.success(x.msg);
          this.route.navigateByUrl('/home');
        } else {
          this.toastrS.error(x.msg);
        }
      });
    }
  }

}
