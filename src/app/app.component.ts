import {Component, OnInit} from '@angular/core';
import {NotificationService} from "./shared/notification.service";
import {WebsocketService} from "./shared/websocket.service";
import {AppNotification} from "./shared/model/app-notification";
import Swal from "sweetalert2";
import {Message} from "./shared/model/Message";
import {MessageService} from "./shared/message.service";

const icon = new Map([
  ['info', 'assets/bell-info.png'],
  ['warn', 'assets/bell-warning.png']
]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Web push Notifications!';
  counter: number;
  topic: string;
  recievedMessage:Message[] =[];
  notifs:AppNotification[] =[];
  messageId: string;

  constructor(private notificationService: NotificationService,
              private websocketService: WebsocketService,
              private messageService:MessageService) {
    this.counter = 0;
  }

  ngOnInit() {
  }
  connect(): void {
    this.websocketService.connect("notif/"+this.topic, "notif");

    // subscribe receives the value.
    this.notificationService.notificationMessage.subscribe((data) => {
      console.log('receive notif', data);
      this.notify(data);
    });
  }


  connectMessage(): void {
    this.websocketService.connect("message/"+this.messageId, "message");

    // subscribe receives the value.
    this.messageService.message.subscribe((data) => {
      console.log('receive message', data);
      this.notifyMessage(data);
    });
  }

  disconnect(): void {
    this.websocketService.disconnect();
  }


  notify(message: AppNotification): void {
    this.notifs.push(message);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message.content,
      showConfirmButton: false,
      timer: 1500
    })

  }

  private notifyMessage(data: Message) {
    this.recievedMessage.push(data);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: data.content,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
