import { Component } from '@angular/core';
import { MessagingService } from './service/messaging.service';
import { BehaviorSubject } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-assignment';
  message: any;
  constructor(private messageService: MessagingService, private primengConfig: PrimeNGConfig) {

  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.messageService.requestPermission();
    this.messageService.receiveMessage();
    this.message = this.messageService.currentMessage;
  }
}
