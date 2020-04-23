// Angular
import { Component, OnInit } from "@angular/core";
// PrimeNG
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
// Services
import { RegistroService } from "src/app/services/registro.service";
import { AuthService } from "src/app/services/auth.service";
// Models
import { Registro } from "src/app/models/Registro";

@Component({
  selector: "app-registros",
  templateUrl: "./registros.component.html",
  styleUrls: ["./registros.component.scss"]
})
export class RegistrosComponent implements OnInit {
  registros: Registro[];
  cols: any[];
  items: MenuItem[];
  form: any = [];
  value: Date;
  displaySaveDialog: boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  registro: Registro;
  selectedRegistro: Registro;

  constructor(
    private registroService: RegistroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  getAll() {
    this.registroService.getAll().subscribe(
      (result: any) => {
        let registros: Registro[] = [];
        for (let i = 0; i < result.length; i++) {
          let registro = result[i] as Registro;
          registros.push(registro);
        }
        console.log(registros);
        this.registros = registros;
      },
      error => {
        console.log(error);
      }
    );
  }

  save() {
    this.registroService.save(this.registro).subscribe((result: any) => {
      let registro = result as Registro;
      this.validarRegistro(registro);
      this.messageService.add({
        severity: "success",
        summary: "Resultado",
        detail: "El Registro se guardo correctamente"
      });
      this.displaySaveDialog = false;
    });
    error => {
      console.log(error);
    };
  }
  validarRegistro(registro: Registro) {
    let index = this.registros.findIndex(e => e.id == registro.id);
    if (index != -1) {
      this.registros[index] = registro;
    } else {
      this.registros.push(registro);
    }
  }
  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedRegistro != null && this.selectedRegistro.id != null) {
        this.registro = this.selectedRegistro;
      } else {
        this.messageService.add({
          severity: "warn",
          summary: "¡¡¡Advertencia!!!",
          detail: "No ha Seleccionado ningun Registro"
        });
        return;
      }
    } else {
      this.registro = new Registro();
    }
    this.displaySaveDialog = true;
  }
  delete() {
    if (this.selectedRegistro == null || this.selectedRegistro == null) {
      this.messageService.add({
        severity: "warn",
        summary: "¡¡¡Advertencia!!!",
        detail: "No ha Seleccionado ningun Registro"
      });
      return;
    }
    this.confirmationService.confirm({
      message: "¿Está serguro que desea eliminar el registro?",
      accept: () => {
        this.registroService
          .delete(this.selectedRegistro.id)
          .subscribe((result: any) => {
            this.messageService.add({
              severity: "success",
              summary: "Resultado",
              detail: "Se elimino el registros " + result.id + " correctamente"
            });
            this.eliminarRegistro(result.id);
          });
      }
    });
  }
  eliminarRegistro(id: number) {
    let index = this.registros.findIndex(e => e.id == id);
    if (index != -1) {
      this.registros.splice(index, 1);
    }
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  ngOnInit(): void {
    this.getAll();
    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => this.showSaveDialog(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => this.showSaveDialog(true)
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => this.delete()
      },
      {
        label: "Actualizar",
        icon: "pi pi-fw pi-refresh",
        command: () => this.getAll()
      }
    ];
    this.cols = [
      { field: "id", header: "ID" },
      { field: "fecha", header: "Fecha" },
      { field: "hora_entrada", header: "Entrada" },
      { field: "hora_salida", header: "Salida" },
      { field: "hora_ordinaria", header: "HO" },
      { field: "recargo_nocturno", header: "RN" },
      { field: "hora_extra", header: "HE" },
      { field: "hora_extra_nocturna", header: "HEN" },
      { field: "hora_extra_festiva", header: "HEF" },
      { field: "hora_extra_festiva_nocturna", header: "HEFN" },
      { field: "persona", subfield: "nombre", header: "Persona" },
      { field: "proyecto", subfield: "nombre", header: "Proyecto" }
    ];
  }
}
