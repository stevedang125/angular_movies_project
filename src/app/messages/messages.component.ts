import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // used public so the html view can call this from there.
  constructor(public messageService: MessageService ) { }

  ngOnInit() {
  }

}
