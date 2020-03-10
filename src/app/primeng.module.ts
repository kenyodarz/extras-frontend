import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Prime NG */
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputMaskModule } from 'primeng/inputmask';
import { TabMenuModule } from 'primeng/tabmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';


const myModule = [
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
  ToolbarModule,
  SplitButtonModule,
  TabViewModule,
  CodeHighlighterModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule]
})
export class PrimengModule {}
