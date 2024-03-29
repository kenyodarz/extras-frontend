// Angular
import { Component, OnInit } from "@angular/core";
// PrimeNG
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
// Services
import { RegistroService } from "src/app/services/registro.service";
import { AuthService } from "src/app/services/auth.service";
import { PersonaService } from "src/app/services/persona.service";
import { ProyectoService } from "src/app/services/proyecto.service";
// Models
import { Registro } from "src/app/models/Registro";
import { Persona } from "src/app/models/Persona";
import { Proyecto } from "src/app/models/Proyecto";

@Component({
  selector: "app-registros",
  templateUrl: "./registros.component.html",
  styleUrls: ["./registros.component.scss"]
})
export class RegistrosComponent implements OnInit {
  personas: Persona[];
  proyectos: Proyecto[];
  registros: Registro[];
  cols: any[];
  items: MenuItem[];
  form: any = [];
  value: Date;
  displaySaveDialog: boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  registro: Registro = {
    id: null,
    fecha: null,
    hora_entrada: null,
    hora_salida: null,
    hora_ordinaria: null,
    recargo_nocturno: null,
    hora_extra: null,
    hora_extra_nocturna: null,
    hora_extra_festiva: null,
    hora_extra_festiva_nocturna: null,
    persona: null,
    proyecto: null,
    festivo: false,
    salario_con_prestaciones: null,
    salario_sin_prestaciones: null,
    actividad: null,
    users: null
  };
  selectedPersona: Persona;
  selectedProyecto: Proyecto;
  selectedRegistro: Registro;

  /**
   * Creates an instance of RegistrosComponent.
   * @param {RegistroService} registroService
   * @param {PersonaService} personaService
   * @param {ProyectoService} proyectoService
   * @param {MessageService} messageService
   * @param {ConfirmationService} confirmationService
   * @param {AuthService} authService
   * @memberof RegistrosComponent
   */
  constructor(
    private registroService: RegistroService,
    private personaService: PersonaService,
    private proyectoService: ProyectoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  /**
   * Metodo que Invoca el Servicio para obtener
   * todos los registros de la API_REST
   *
   * @memberof RegistrosComponent
   */
  getAll() {
    this.registroService.getAll().subscribe(
      (result: any) => {
        let registros: Registro[] = [];
        for (let i = 0; i < result.length; i++) {
          let registro = result[i] as Registro;
          registros.push(registro);
        }
        this.registros = registros.sort(function(a, b) {
          if (a.fecha > b.fecha) {
            return 1;
          }
          if (a.fecha < b.fecha) {
            return -1;
          }
          return 0;
        });
        console.log(registros);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   *  Metodo que Invoca el Servicio para obtener
   * todas las personas de la API_REST
   *
   * @memberof RegistrosComponent
   */
  getAllPersona() {
    this.personaService.getAll().subscribe(
      (result: any) => {
        let personas: Persona[] = [];
        for (let i = 0; i < result.length; i++) {
          let persona = result[i] as Persona;
          personas.push(persona);
        }
        this.personas = personas;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Metodo que Invoca el Servicio para obtener
   * todos los proyectos de la API_REST
   * @memberof RegistrosComponent
   */
  getAllProyecto() {
    this.proyectoService.getAll().subscribe(
      (result: any) => {
        let proyectos: Proyecto[] = [];
        for (let i = 0; i < result.length; i++) {
          let proyecto = result[i] as Proyecto;
          proyectos.push(proyecto);
        }
        this.proyectos = proyectos;
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
    this.getAllPersona();
    this.getAllProyecto();
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
