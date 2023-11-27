import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/Auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';
  subscriptions: Subscription[] = [];
  userId: string = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn),
      this.authService.userName$.subscribe(userName => this.userName = userName),
      this.authService.userId$.subscribe(userId => this.userId = userId)
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
