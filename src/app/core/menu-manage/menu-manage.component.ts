import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { TokenService } from '../../shared/services/token.service';
import { Router } from '@angular/router';
import { UtilToolsService } from '../../shared/services/util-tools.service';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrl: './menu-manage.component.css'
})
export class MenuManageComponent implements OnInit{

  isLogged = false;
  isAdmin = false;
  isOwner = false;
  isScreenSm!: boolean;
  isScreenXs!: boolean;
  screenSize!: string;
  smLimit!: boolean;
  isSmallMenu: boolean = false;

  flagSideNav: boolean = false;

  constructor(private eventService: EventService,
    private tokenService: TokenService,
    private router: Router,
    private utilToolsService: UtilToolsService
  ) { }
  
  ngOnInit() {
    this.isLogged =  this.tokenService.isLogged();

  }

  onLogOut(): void{
    if (!this.tokenService.isLogged()) {
      return;
    }

    this.utilToolsService.logoutMessage();
  }

  onSmallMenu(): void{
    this.eventService.flagSidenav.emit(true);
  }

  cleanGlobalInfo(): void { }

}
