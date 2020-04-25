// Angular
import { Component, OnInit } from "@angular/core";
// PrimeNG
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
// Services
import { ProyectoService } from "src/app/services/proyecto.service";
import { AuthService } from "src/app/services/auth.service";
// Modelos
import { Proyecto } from "src/app/models/Proyecto";

@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ["./proyectos.component.scss"]
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[];
  cols: any[];
  items: MenuItem[];
  form: any = {};
  value = Date;
  displaySaveDialog: boolean = false;
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: string = "";
  proyecto: Proyecto = {
    idProyecto: null,
    nombre: null
  };
  selectedProyecto: Proyecto;

  constructor(
    private proyectoService: ProyectoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  getAll() {
    this.proyectoService.getAll().subscribe(
      (result: any) => {
        let proyectos: Proyecto[] = [];
        for (let i = 0; i < result.length; i++) {
          let proyecto = result[i] as Proyecto;
          proyectos.push(proyecto);
        }
        console.log(proyectos);
        this.proyectos = proyectos;
      },
      error => {
        console.log(error);
      }
    );
  }

  save() {
    this.proyectoService.save(this.proyecto).subscribe(
      (result: any) => {
        let proyecto = result as Proyecto;
        this.validarProyecto(proyecto);
        this.messageService.add({
          severity: "success",
          summary: "Resultado",
          detail: "Se guardo el Proyecto correctamente"
        });
        this.displaySaveDialog = false;
      },
      error => {
        console.log(error);
      }
    );
  }
  validarProyecto(proyecto: Proyecto) {
    let index = this.proyectos.findIndex(
      e => e.idProyecto == proyecto.idProyecto
    );
    if (index != -1) {
      this.proyectos[index] = proyecto;
    } else {
      this.proyectos.push(proyecto);
    }
  }
  showSaveDialog(editar: boolean) {
    if (editar) {
      if (
        this.selectedProyecto != null &&
        this.selectedProyecto.idProyecto != null
      ) {
        this.proyecto = this.selectedProyecto;
      } else {
        this.messageService.add({
          severity: "warn",
          summary: "¡¡¡Advertencia!!!",
          detail: "No ha seleccionado ningun Proyecto"
        });
        return;
      }
    } else {
      this.proyecto = new Proyecto();
    }
    this.displaySaveDialog = true;
  }

  delete() {
    if (
      this.selectedProyecto == null ||
      this.selectedProyecto.idProyecto == null
    ) {
      this.messageService.add({
        severity: "warn",
        summary: "¡¡¡Advertencia!!!",
        detail: "No ha Seleccionado ningun Registro"
      });
      return;
    }
    this.confirmationService.confirm({
      message: "¿Esta seguro que desea eliminar el proyecto?",
      accept: () => {
        this.proyectoService
          .delete(this.selectedProyecto.idProyecto)
          .subscribe((result: any) => {
            this.messageService.add({
              severity: "success",
              summary: "Resultado",
              detail:
                "Se elimino el proyecto " + result.idProyecto + " correctamente"
            });
            this.eliminarProyecto(result.idProyecto);
          });
      }
    });
  }
  eliminarProyecto(idProyecto: string) {
    let index = this.proyectos.findIndex(e => e.idProyecto == idProyecto);
    if (index != -1) {
      this.proyectos.splice(index, 1);
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

    this.cols = [
      { field: "idProyecto", header: "Id" },
      { field: "nombre", header: "Nombre" }
    ];
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
  }
}
