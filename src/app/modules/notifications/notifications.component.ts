import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  name: string | undefined;
  notifications: any[] =[];

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.ApiService.getUsername().subscribe(
      (data: any) => {
        this.name = data.user.username;
      }
    );
    this.ApiService.getNotifications().subscribe(
      (data: any) => {
        this.notifications = data;
      }
    );

  }

}
