import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages: string[] = [];
  

  constructor() { }
  

  add(msg : string)
  {
    this.messages.push(msg);
  }

  deleteAllMessages()
  {
    this.messages = [];
  }





}
