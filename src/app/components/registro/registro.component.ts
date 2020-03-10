import { Component, OnInit } from "@angular/core";
import { RegistroService } from "src/app/services/registro.service";
import { Registro } from "src/app/models/Registro";
import { MenuItem } from "primeng/api/menuitem";
import { MessageService, ConfirmationService } from "primeng/api";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"]
})
export class RegistroComponent implements OnInit {
  registros: Registro[];
  cols: any[];
  items: MenuItem[];
  value: Date;
  es: any;
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
    proyecto: null
  };
  selectedRegistro: Registro = {
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
    proyecto: null
  };

  displaySaveDialog = false;

  constructor(
    private registroService: RegistroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
    this.registroService.save(this.registro).subscribe(result => {
      let registro = result as Registro;
      this.validarRegistro(registro);
      this.messageService.add({
        severity: "success",
        summary: "Resultado",
        detail: "Se guardo el registro correctamente"
      });
    });
  }

  validarRegistro(registro: Registro) {
    let index = this.registros.findIndex(e => e.id === registro.id);
    if (index !== -1) {
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
          detail: "No se ha seleccionado ningun Registro"
        });
        return;
      }
    } else {
      this.registro = new Registro();
    }
    this.displaySaveDialog = true;
  }

  delete() {
    if (this.selectedRegistro == null || this.selectedRegistro.id == null) {
      this.messageService.add({
        severity: "warn",
        summary: "¡¡¡Advertencia!!!",
        detail: "No ha Seleccionado ningun Registro"
      });
      return;
    }
    this.confirmationService.confirm({
      message: "¿Esta seguro que desea eliminar el registro?",
      accept: () => {
        this.registroService
          .delete(this.selectedRegistro.id)
          .subscribe((result: any) => {
            this.messageService.add({
              severity: "success",
              summary: "Resultado",
              detail: "Se elimino el Registros " + result.id + " correctamente"
            });
            this.eliminarRegistro;
          });
      }
    });
  }
  eliminarRegistro(id: number) {
    let index = this.registros.findIndex(e => e.id === id);
    if (index !== -1) {
      this.registros.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.getAll();
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
      { field: "fecha", header: "Fecha" },
      { field: "hora_entrada", header: "Hora Entrada" },
      { field: "hora_salida", header: "Hora Salida" },
      { field: "hora_ordinaria", header: "HO" },
      { field: "recargo_nocturno", header: "RN" },
      { field: "hora_extra", header: "HE" },
      { field: "hora_extra_nocturna", header: "HEN" },
      { field: "hora_extra_festiva", header: "HEF" },
      { field: "hora_extra_festiva_nocturna", header: "HEFN" },
      { field: "persona", subfield: "nombre", header: "Persona" },
      { field: "proyecto", subfield: "nombreProyecto", header: "Proyecto" }
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
