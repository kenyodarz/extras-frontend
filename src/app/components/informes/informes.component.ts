import { Component, OnInit } from "@angular/core";
// PrimeNG
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
import { TreeNode } from "primeng/api";
// Modelos
import { Registro } from "src/app/models/Registro";
import { Persona } from "src/app/models/Persona";
// Servicios
import { RegistroService } from "./../../services/registro.service";

@Component({
  selector: "app-informes",
  templateUrl: "./informes.component.html",
  styleUrls: ["./informes.component.scss"]
})
export class InformesComponent implements OnInit {
  registros: Registro[];
  persona: Persona;
  files: TreeNode[];
  cols: any[];
  rowGroupMetadata: any;
  items: MenuItem[];

  constructor(private registroService: RegistroService) {}

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
        this.updateRowGroupMetaData();
      },
      error => {
        console.log(error);
      }
    );
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.registros) {
      for (let i = 0; i < this.registros.length; i++) {
        let rowData = this.registros[i].persona["cedula"];
        let persona = rowData;
        if (i == 0) {
          this.rowGroupMetadata[persona] = { index: 0, size: 1 };
        } else {
          let previousRowData = this.registros[i - 1].persona["cedula"];
          let previousRowGroup = previousRowData;
          if (persona === previousRowGroup) {
            this.rowGroupMetadata[persona].size++;
          } else {
            this.rowGroupMetadata[persona] = { index: i, size: 1 };
          }
        }
      }
    }
    console.log("rowGroupMetadata " + this.rowGroupMetadata);
  }

  ngOnInit(): void {
    this.getAll();
    this.cols = [
      // { field: "persona", subfield: "nombre", header: "Persona" },
      // { field: "id", header: "ID" },
      // { field: "fecha", header: "Fecha" },
      // { field: "hora_entrada", header: "Entrada" },
      // { field: "hora_salida", header: "Salida" },
      { field: "hora_ordinaria", header: "HO" },
      { field: "recargo_nocturno", header: "RN" },
      { field: "hora_extra", header: "HE" },
      { field: "hora_extra_nocturna", header: "HEN" },
      { field: "hora_extra_festiva", header: "HEF" },
      { field: "hora_extra_festiva_nocturna", header: "HEFN" }
      // { field: "proyecto", subfield: "nombre", header: "Proyecto" }
    ];
    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        // command: () => this.showSaveDialog(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        // command: () => this.showSaveDialog(true)
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        // command: () => this.delete()
      },
      {
        label: "Actualizar",
        icon: "pi pi-fw pi-refresh",
        // command: () => this.getAll()
      }
    ];
  }
}
