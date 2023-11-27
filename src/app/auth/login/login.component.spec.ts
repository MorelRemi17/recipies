// login.component.spec.ts
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AuthService} from "../../core/services/Auth.service";
import {throwError} from "rxjs";

const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [LoginComponent],
            providers: [
                {provide: AuthService, useValue: authServiceSpy},
                {provide: Router, useValue: routerSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid when empty', () => {
        expect(component.loginForm.valid).toBeFalsy();
    });

    it('form should be valid when filled with correct data', () => {
        component.loginForm.controls['email'].setValue('test@example.com');
        component.loginForm.controls['password'].setValue('123456');
        expect(component.loginForm.valid).toBeTruthy();
    });

    it('should display error message when login fails', () => {
        component.loginForm.controls['email'].setValue('wrong@example.com');
        component.loginForm.controls['password'].setValue('wrongpassword');
        authServiceSpy.loginWithPassword.and.returnValue(throwError(() => new Error('Test error')));

        const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
        button.click();
        fixture.detectChanges();

        const errorMessage = fixture.debugElement.query(By.css('.alert-danger')).nativeElement;
        expect(errorMessage.textContent).toContain('Test error');
    });

});
