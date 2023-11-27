import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../core/services/Auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.loginWithPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/recipes/list');
        },
        error: (error) => {
          if (error.status === 0 || error.status === 504) {
            this.errorMessage = "Le service d'authentification n'est pas disponible. Veuillez vérifier que l'API est en ligne.";
          } else {
            this.errorMessage = "Une erreur est survenue lors de la tentative de connexion.";
          }
        }
      });
    }
  }

  createAccount() {
    this.router.navigateByUrl('/users/new')
  }
}
