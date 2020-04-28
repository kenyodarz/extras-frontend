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
  Validators,
  FormArray
} from "@angular/forms";
// PrimeNg
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
//Modelo
import { Persona } from "src/app/models/Persona";
import { Proyecto } from "src/app/models/Proyecto";
import { Registro } from 'src/app/models/Registro';
// Servicios
import { PersonaService } from "src/app/services/persona.service";
import { AuthService } from "src/app/services/auth.service";
import { ProyectoService } from "src/app/services/proyecto.service";
import { RegistroService } from "src/app/services/registro.service";

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
  registros: Registro[];
  selectedPersona: Persona;
  selectedProyecto: Proyecto;
  selectedRegistro: Registro;
  display: boolean;
  es: any;
  date: Date;
  entradaHora: Date;
  salidaHora: Date;
  isfestivo: boolean;
  isSuccessful = false;
  isSignUpFailed = false;
  form: any = {};
  errorMessage = "";
  public formEntrada: FormGroup;
  timeValue: string;
  cols: any[];
  items: MenuItem[];

  constructor(
    private personaService: PersonaService,
    private proyectoService: ProyectoService,
    private registroService: RegistroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.display = true;
    this.date = null;
    this.personas = [];
    this.proyectos = [];
    this.registros = [];
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

  getAllRegistros() {
    this.registroService.getAll().subscribe(
      (result: any) => {
        let registros: Registro[] = [];
        for (let i = 0; i < result.length; i++) {
          let registro = result[i] as Registro;
          if (this.date == registro.fecha) {
            registros.push(registro);
          }
        }
        this.registros = registros;
        console.log(this.registros);
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
    console.log(this.formEntrada.value + "Agregar Entrada");
    console.log(JSON.stringify(this.formEntrada.value));
    this.registroService.save(this.formEntrada.value).subscribe(
      (result: any) => {
        let registro = result as Registro;
        //this.validarRegistro(registro);
        this.getAllRegistros();
        this.messageService.add({
          severity: "success",
          summary: "Resultado",
          detail: "Se Agrego el Registro Correctamente"
        });
      },
      error => {
        console.log(error);
        this.messageService.add({
          severity: "warn",
          summary: "¡¡¡Advertencia!!!",
          detail: "No ha Seleccionado ningun Registro"
        });
      }
    );
  }
  validarRegistro(registro: Registro) {
    throw new Error("Method not implemented.");
  }

  get persona() {
    return this.formEntrada.get("persona");
  }

  get proyecto() {
    return this.formEntrada.get("proyecto");
  }

  get hora_entrada() {
    return this.formEntrada.get("hora_entrada");
  }

  get hora_salida() {
    return this.formEntrada.get("hora_salida");
  }

  get fecha() {
    return this.formEntrada.get("fecha");
  }

  get festivo() {
    return this.formEntrada.get("festivo");
  }

  onFechaChange() {
    console.log("Fecha Seleccionada: " + this.date);
    this.getAllRegistros();
  }

  aceptar() {
    this.display = false;
  }

  delete(): void {
    console.log("Eliminando");
    
  }

  ngOnInit(): void {
    this.formEntrada = this.formBuilder.group({
      fecha: new FormControl(null, Validators.required),
      hora_entrada: new FormControl(null, Validators.required),
      hora_salida: new FormControl(null, Validators.required),
      persona: new FormControl(null, Validators.required),
      proyecto: new FormControl(null, Validators.required),
      festivo: new FormControl(false, Validators.required)
    });
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
    this.cols = [
      { field: "id", header: "ID" },
      { field: "persona", subfield: "nombre", header: "Persona" },
      { field: "proyecto", subfield: "nombre", header: "Proyecto" },
      { field: "fecha", header: "Fecha" },
      { field: "hora_entrada", header: "Entrada" },
      { field: "hora_salida", header: "Salida" }
      //{ field: "hora_ordinaria", header: "HO" },
      //{ field: "recargo_nocturno", header: "RN" },
      //{ field: "hora_extra", header: "HE" },
      //{ field: "hora_extra_nocturna", header: "HEN" },
      //{ field: "hora_extra_festiva", header: "HEF" },
      //{ field: "hora_extra_festiva_nocturna", header: "HEFN" },
    ];
    this.items = [
      // {
      //   label: "Nuevo",
      //   icon: "pi pi-fw pi-plus",
      //   command: () => this.showSaveDialog(false)
      // },
      // {
      //   label: "Editar",
      //   icon: "pi pi-fw pi-pencil",
      //   command: () => this.showSaveDialog(true)
      // },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => this.delete()
      },
      {
        label: "Actualizar",
        icon: "pi pi-fw pi-refresh",
        command: () => this.getAllRegistros()
      }
    ];
  }
}
