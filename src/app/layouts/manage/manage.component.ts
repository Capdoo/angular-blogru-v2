import { Component, OnInit } from '@angular/core';
import { NavItem } from '../interfaces/nav-item';
import { EventService } from '../../shared/services/event.service';
import { TokenService } from '../../shared/services/token.service';
import { UtilToolsService } from '../../shared/services/util-tools.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit{
  
  flagSideNav: boolean = true;
  username: string = "";
  navItems: NavItem[] = [
    {
      displayName: 'Inicio',
      iconName: 'home',
      route: 'dashboard'
    },
    {
      displayName: 'Posts',
      iconName: 'article',
      children: [
        {
          displayName: 'Nuevo post',
          iconName: 'post_add',
          route: 'dashboard/posts/redact'
        },
        // {
        //   displayName: 'Nuevo post',
        //   iconName: 'post_add',
        //   route: 'dashboard/posts/new-post'
        // },
        {
          displayName: 'Mis posts',
          iconName: 'view_list',
          route: 'dashboard/posts/my-posts'
        },
      ]
    }
  ]

  constructor(private eventService: EventService,
    private observer: BreakpointObserver,
    private tokenService: TokenService,
    private utilToolsService: UtilToolsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("@@@@@@@@@@@@@@@MANAGE");

    // this.isLogged = this.tokenService.isLogged();
    if (this.tokenService.isLogged()) {
      // this.eventService.flagLogged.emit(true);
    }


    this.eventService.flagSidenav.subscribe(
      res => {
        if (res) {
          this.flagSideNav = !this.flagSideNav;
        }
      }
    );

    this.observer.observe(["(max-width: 992px)"]).subscribe(
      res => {
        if (res.matches) {
          this.flagSideNav = false;
        } else {
          this.flagSideNav = true;
        }
      }
    );

    this.username = this.tokenService.getUsernameV2();
  }

  onCerrarSesion(): void {
    this.utilToolsService.logoutMessage();
  }


}
