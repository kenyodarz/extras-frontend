// Angular
import { Component, OnInit } from "@angular/core";
// PrimeNg
import { SelectItem } from "primeng/api";
import { MessageService, ConfirmationService } from "primeng/api";
//Modelo
import { Persona } from "src/app/models/Persona";
import { Proyecto } from "src/app/models/Proyecto";
// Servicios
import { PersonaService } from "src/app/services/persona.service";
import { AuthService } from "src/app/services/auth.service";
import { ProyectoService } from "src/app/services/proyecto.service";

@Component({
  selector: "app-entradas",
  templateUrl: "./entradas.component.html",
  styleUrls: ["./entradas.component.scss"]
})
export class EntradasComponent implements OnInit {
  personas: SelectItem[];
  proyectos: SelectItem[];
  selectedPersona: Persona;
  selectedProyecto: Proyecto;
  display: boolean;
  es: any;
  date: Date;
  time: Date;
  time2: Date;
  festivo: boolean;
  isSuccessful = false;
  isSignUpFailed = false;
  form: any = {};
  errorMessage = "";

  constructor(
    private personaService: PersonaService,
    private proyectoService: ProyectoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {
    this.display = false;
    this.personas = [{ label: "nombre", value: "cedula" }];
    this.proyectos = [{ label: "nombre", value: "idProyecto" }];
  }

  getAllPersona() {
    this.personaService.getAll().subscribe(
      (result: any) => {
        for (let i = 0; i < result.length; i++) {
          let persona = result[i] as Persona;
          this.personas[i] = { label: persona.nombre, value: persona.cedula };
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllProyecto() {
    this.proyectoService.getAll().subscribe(
      (result: any) => {
        for (let i = 0; i < result.length; i++) {
          let proyecto = result[i] as Proyecto;
          this.proyectos[i] = {
            label: proyecto.nombre,
            value: proyecto.idProyecto
          };
        }
      },
      error => {
        console.log(error);
      }
    );
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
    this.getAllPersona();
    this.getAllProyecto();
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado"
      ],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
      ],
      monthNamesShort: [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic"
      ],
      today: "Hoy",
      clear: "Borrar"
    };
  }
}
