import { Component, Input, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment'; // Import the environment

interface Message {
  username: string;
  message: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  username = '';
  message = '';
  typing: boolean = false;
  messages: Message[] = [];
  id: string = '';
  pusherApiKey: string = ''; // Variable to store Pusher API key from the environment

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id') ?? '';
    this.username = route.snapshot.queryParamMap.get('user') ?? '';
    console.log(this.id);

    // Use the Pusher API key from the environment
    this.pusherApiKey = environment.pusherApiKey;
  }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher(this.pusherApiKey, { // Use the fetched Pusher API key
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('chat' + this.id);

    channel.bind("pusher:subscription_succeeded", (members: any[]) => {
      console.log("Subscription");
      console.log(members);
    });

    channel.bind('message', (data: any) => {
      console.log("Hey" + data);
      this.messages.push(data);
    });

  }

  submit(): void {
    this.http.post('http://localhost:8000/api/messages/' + this.id, {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }

}
