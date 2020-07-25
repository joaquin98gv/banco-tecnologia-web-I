import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/service.index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Result } from '../models/result.model';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  urlNext: string;
  constructor(  public route: Router,
                private actRoute: ActivatedRoute,
                public loginS: LoginService,
                private fb: FormBuilder,
                public toastrS: ToastrService  ) {
    this.crearFormulario();
    this.actRoute.queryParams.subscribe((x: any) => {
      this.urlNext = x.next != null ? x.next : '/home';
      console.log(this.urlNext);
    });
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.form = this.fb.group({
      Email: ['', Validators.required],
      Pass: ['', Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      this.toastrS.warning('Comprobando credenciales...', 'Espere!');
      this.loginS.logear(this.form.value).subscribe((x: Result) => {
        if (x.status === 200) {
          this.toastrS.success(x.msg);
          localStorage.setItem('Authorization', btoa(x.data.Email));
          const data = { id: x.data.Id, email: x.data.Email, nombre: x.data.NombreCompleto };
          localStorage.setItem('user_tw1', JSON.stringify(data));
          this.route.navigateByUrl(this.urlNext);
        }else{
          this.toastrS.error(x.msg);
        }
      });
    }
  }

}
