import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../core/services/Auth.service";
import {AuthGuard} from "./authGuard";

describe('AuthGuard', () => {
    let authService: AuthService;
    let authGuard: AuthGuard;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                AuthService,
                AuthGuard,
                {provide: Router, useValue: {navigateByUrl: jasmine.createSpy('navigateByUrl')}}
            ]
        });

        authService = TestBed.inject(AuthService);
        authGuard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router);
    });

    it('should allow the authenticated user to access app', () => {
        spyOn(authService, 'getToken').and.returnValue('MyFakeToken');
        const routeSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        const routerState: RouterStateSnapshot = {url: '/some-url'} as RouterStateSnapshot;

        expect(authGuard.canActivate(routeSnapshot, routerState)).toBe(true);
    });

    it('should not allow the unauthenticated user to access app and redirect to login', () => {
        spyOn(authService, 'getToken').and.returnValue('');
        const routeSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        const routerState: RouterStateSnapshot = {url: '/some-url'} as RouterStateSnapshot;

        expect(authGuard.canActivate(routeSnapshot, routerState)).toBe(false);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    });
});
