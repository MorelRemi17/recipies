import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/User.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = 'http://localhost:3307/api';
    private usersEndpoint = '/users';

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}${this.usersEndpoint}`);
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}${this.usersEndpoint}/${id}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}${this.usersEndpoint}`, user);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}${this.usersEndpoint}/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${this.usersEndpoint}/${id}`);
    }

    authenticateUser(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}${this.usersEndpoint}/login`, {email, password});
    }
}
