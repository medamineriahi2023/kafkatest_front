import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message = new EventEmitter();

  constructor() { }
}
