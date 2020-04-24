// Angular
import { Component, OnInit } from "@angular/core";
// PrimeNg
import { SelectItem } from "primeng/api";
import { MessageService, ConfirmationService } from "primeng/api";
//Modelo
import { Persona } from "src/app/models/Persona";
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
  selectedPersona: Persona;
  display: boolean;
  es: any;
  date: Date;
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
    this.personas = [
      {label: 'nombre', value: 'cedula'}
    ]
  }

  getAllPersona() {
    this.personaService.getAll().subscribe(
      (result: any) => {
        for (let i = 0; i < result.length; i++) {
          let persona = result[i] as Persona;
          this.personas[i]= {label: persona.nombre , value : persona.cedula};
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllProyecto(){
    
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
