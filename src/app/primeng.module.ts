import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

/* Prime NG */
import { PanelModule } from "primeng/panel";
import { MenubarModule } from "primeng/menubar";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { ToastModule } from "primeng/toast";
import { TableModule } from "primeng/table";
import { PasswordModule } from "primeng/password";
import { ToggleButtonModule } from "primeng/togglebutton";
import { InputMaskModule } from "primeng/inputmask";
import { TabMenuModule } from "primeng/tabmenu";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PaginatorModule } from "primeng/paginator";
import { ChartModule } from "primeng/chart";
import { CardModule } from "primeng/card";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ToolbarModule } from "primeng/toolbar";
import { SplitButtonModule } from "primeng/splitbutton";
import { TabViewModule } from "primeng/tabview";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { CheckboxModule } from "primeng/checkbox";
import { MultiSelectModule } from "primeng/multiselect";
import { SidebarModule } from "primeng/sidebar";
import { TreeTableModule } from "primeng/treetable";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";

const myModule = [
  MessagesModule,
  ToolbarModule,
  SplitButtonModule,
  TabViewModule,
  CodeHighlighterModule,
  MessageModule,
  PanelModule,
  MenubarModule,
  DialogModule,
  InputTextModule,
  ButtonModule,
  CalendarModule,
  ToastModule,
  TableModule,
  PasswordModule,
  ToggleButtonModule,
  InputMaskModule,
  TabMenuModule,
  ConfirmDialogModule,
  PaginatorModule,
  ChartModule,
  CardModule,
  CheckboxModule,
  MultiSelectModule,
  SidebarModule,
  TreeTableModule,
  DropdownModule,
  InputTextareaModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule],
  providers: []
})
export class PrimengModule {}
