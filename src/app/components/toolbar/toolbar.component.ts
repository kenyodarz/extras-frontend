import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  appName = "CDM MANTENIMIENTO Y SERVICIOS";
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showPersonasBoard = false;
  showProyectosBoard = false;
  showRegistrosBoard = false;
  showEntradasBoard = false;
  showInformesBoard = false;
  visibleSidebar = false;
  username: string;
  showSupervisorBoard = false;

  /**
   * Creates an instance of ToolbarComponent.
   * @param {TokenStorageService} tokenStorageService
   * @memberof ToolbarComponent
   */
  constructor(
    private tokenStorageService: TokenStorageService,
    private confirmationService: ConfirmationService
  ) {}

  // Metodo se ejecuta cuando inicia el componente
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
      this.showModeratorBoard = this.roles.includes("ROLE_MODERATOR");
      this.showSupervisorBoard = this.roles.includes("ROLE_SUPERVISOR");
      this.showPersonasBoard = this.roles.includes("ROLE_ADMIN");
      this.showProyectosBoard = this.roles.includes("ROLE_ADMIN");
      this.showRegistrosBoard = this.roles.includes("ROLE_ADMIN");
      this.showEntradasBoard = this.roles.includes("ROLE_USER");
      this.showInformesBoard = this.roles.includes("ROLE_ADMIN");

      this.username = user.username;
    }
  }
  logout() {
    this.confirmationService.confirm({
      message: "¿Esta Seguro que desea cerrar sesion?",
      header :"Cerrar Sesion",
      accept: () => {
        this.tokenStorageService.singOut();
        this.irAlInicio();
        window.location.reload();
      },
      reject: () => {
        this.irAlInicio();
      }
    });
  }
  irAlInicio() {
    window.location.replace("#/home");
  }
}
