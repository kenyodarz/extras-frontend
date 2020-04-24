// Angular
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent
} from "@angular/animations";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
// PrimeNg
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
  styleUrls: ["./entradas.component.scss"],
  animations: [
    trigger("animation", [
      state(
        "visible",
        style({
          transform: "translateX(0)",
          opacity: 1
        })
      ),
      transition("void => *", [
        style({ transform: "translateX(50%)", opacity: 0 }),
        animate("300ms ease-out")
      ]),
      transition("* => void", [
        animate(
          "250ms ease-in",
          style({
            height: 0,
            opacity: 0,
            transform: "translateX(50%)"
          })
        )
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class EntradasComponent implements OnInit {
  personas: Persona[];
  proyectos: Proyecto[];
  selectedPersona: Persona;
  selectedProyecto: Proyecto;
  display: boolean;
  es: any;
  date: Date;
  entradaHora: Date;
  salidaHora: Date;
  festivo: boolean;
  isSuccessful = false;
  isSignUpFailed = false;
  form: any = {};
  errorMessage = "";
  public formEntrada: FormGroup;

  constructor(
    private personaService: PersonaService,
    private proyectoService: ProyectoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.display = false;
    this.festivo = false;
    this.date = new Date;
    this.personas = [];
    this.proyectos = [];
    this.formEntrada = this.formBuilder.group({
      persona: new FormControl(null, Validators.required),
      proyecto: new FormControl(null, Validators.required),
      entrada: new FormControl(null, Validators.required),
      salida: new FormControl(null, Validators.required)
    });
  }

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

  agregarEntrada() {
    console.log(this.formEntrada.value);
  }

  get persona() {
    return this.formEntrada.get("persona");
  }

  get proyecto(){
    return this.formEntrada.get("proyecto")
  }

  get entrada(){
    return this.formEntrada.get("entrada")
  }

  get salida(){
    return this.formEntrada.get("salida")
  }

  onPersonaChange(){
    let persona: Persona = this.persona.value;
    console.log("Persona Seleccionada: " + persona.nombre);
    
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
