import { Component, OnInit } from "@angular/core";
// tslint:disable-next-line: no-submodule-imports
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  styles: [
    `
      :host ::ng-deep button {
        margin-right: 0.25em;
      }
      :host ::ng-deep .ui-splitbutton {
        margin-left: 0.25em;
      }
      :host ::ng-deep .ui-splitbutton button {
        margin-right: 0;
      }
    `
  ]
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: "Angular.io",
        icon: "pi pi-external-link",
        url: "http://angular.io"
      },
      { label: "Theming", icon: "pi pi-palette", routerLink: ["/theming"] }
    ];
  }
}
