import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  @Output() flagLogged: EventEmitter<boolean> = new EventEmitter();
  @Output() flagLogout: EventEmitter<boolean> = new EventEmitter();
  @Output() flagSidenav: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
