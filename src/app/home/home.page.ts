import { DatosService } from './../services/datos.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id: number;
  name: string;
  lastName: string;
  mostrar = false;

  constructor(private datosService: DatosService) {
  }

  generarUsuario() {
    this.datosService.createUser(this.id, this.name, this.lastName);
    this.mostrar=true;
  }

  solicitarUsuario() {
    this.datosService.getAllUsers().then((users) => {
      return users;
    }).catch(() => {
      return null;
    });
  }
}
