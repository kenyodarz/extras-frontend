import { Component, OnInit } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
import { Persona } from "src/app/models/Persona";
import { PersonaService } from "src/app/services/persona.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-personas",
  templateUrl: "./personas.component.html",
  styleUrls: ["./personas.component.scss"]
})
export class PersonasComponent implements OnInit {
  personas: Persona[];
  cols: any[];
  items: MenuItem[];
  form: any = {};
  value: Date;
  displaySaveDialog: boolean = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  persona: Persona = {
    cedula: null,
    nombre: null,
    salario: null
  };
  selectedPersona: Persona;

  constructor(
    private personaService: PersonaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  getAll() {
    this.personaService.getAll().subscribe(
      (result: any) => {
        let personas: Persona[] = [];
        for (let i = 0; i < result.length; i++) {
          let persona = result[i] as Persona;
          personas.push(persona);
        }
        console.log(personas);
        this.personas = personas;
      },
      error => {
        console.log(error);
      }
    );
  }
  save() {
    this.personaService.save(this.persona).subscribe((result: any) => {
      let persona = result as Persona;
      this.validarPersona(persona);
      this.messageService.add({
        severity: "success",
        summary: "Resultado",
        detail: "Se guardo a la persona correctamente"
      });
      this.displaySaveDialog = false;
    });
    error => {
      console.log(error);
    };
  }
  validarPersona(persona: Persona) {
    let index = this.personas.findIndex(e => e.cedula == persona.cedula);
    if (index != -1) {
      this.personas[index] = persona;
    } else {
      this.personas.push(persona);
    }
  }
  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedPersona != null && this.selectedPersona.cedula != null) {
        this.persona = this.selectedPersona;
      } else {
        this.messageService.add({
          severity: "warn",
          summary: "¡¡¡Advertencia!!!",
          detail: "No ha Seleccionado ningun Registro"
        });
        return;
      }
    } else {
      this.persona = new Persona();
    }
    this.displaySaveDialog = true;
  }
  delete() {
    if (this.selectedPersona == null || this.selectedPersona.cedula == null) {
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
        this.personaService
          .delete(this.selectedPersona.cedula)
          .subscribe((result: any) => {
            this.messageService.add({
              severity: "success",
              summary: "Resultado",
              detail: "Se elimino a la persona " + result.id + " correctamente"
            });
            this.eliminarPersona(result.cedula);
          });
      }
    });
  }
  eliminarPersona(cedula: string) {
    let index = this.personas.findIndex(e => e.cedula == cedula);
    if (index != -1) {
      this.personas.splice(index, 1);
    } else {
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
      { field: "cedula", header: "Cedula" },
      { field: "nombre", header: "Nombres" },
      { field: "salario", header: "Salario" }
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
