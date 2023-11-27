import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {UserService} from "./User.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  isLoggedIn$: Observable<boolean> = this.loggedInStatus.asObservable();
  userName$: Observable<string> = this.userName.asObservable();
  userId$: Observable<string> = this.userId.asObservable();
  token!: string;

  constructor(private userService: UserService, private router: Router) {
  }

  getToken(): string {
    return this.token;
  }

  loginWithPassword(email: string, password: string): Observable<any> {
    this.token = "MyFakeToken"
    return this.userService.authenticateUser(email, password).pipe(
      tap(response => {
        this.loggedInStatus.next(true);
        this.userName.next(response.name);
        this.userId.next(response.id);
      })
    );
  }

  logout(): void {
    this.loggedInStatus.next(false);
    this.userName.next('');
    this.userId.next('');
    this.router.navigateByUrl('');
  }
}
