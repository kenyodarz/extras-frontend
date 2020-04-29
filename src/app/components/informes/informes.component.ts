import { Component, OnInit, Input, Inject } from "@angular/core";
// PrimeNG
import { MessageService, ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
import { TreeNode } from "primeng/api";
// Modelos
import { Registro } from "src/app/models/Registro";
import { Persona } from "src/app/models/Persona";
// Servicios
import { RegistroService } from "./../../services/registro.service";
// Utilidades
import * as jsPDF from "jspdf"; 
import "jspdf-autotable";


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
  exportColumns: any[];
  rowGroupMetadata: any;
  items: MenuItem[];
  prestaciones: boolean;

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
    console.log("rowGroupMetadata " + JSON.stringify(this.rowGroupMetadata));
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
      { field: "hora_extra_festiva_nocturna", header: "HEFN" },
      { field: "salario_sin_prestaciones", header: "Salario" },
      { field: "salario_sin_prestaciones", header: "Salario" }
      // { field: "proyecto", subfield: "nombre", header: "Proyecto" }
    ];
    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus"
        // command: () => this.showSaveDialog(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil"
        // command: () => this.showSaveDialog(true)
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash"
        // command: () => this.delete()
      },
      {
        label: "Actualizar",
        icon: "pi pi-fw pi-refresh"
        // command: () => this.getAll()
      }
    ];
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  }

  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.registros);
        doc.save("InformesPDF.pdf");
      });
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      // const worksheet = xlsx.utils.json_to_sheet(this.getAllRegistrosExcel());
      const worksheet = xlsx.utils.table_to_sheet(
        document.getElementById("dt")
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "InformesExcel");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
}
