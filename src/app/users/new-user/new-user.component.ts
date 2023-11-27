import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "../../core/services/User.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[0-9]).*$')
      ]]
    });
  }

  onSubmitForm(event: Event) {
    event.preventDefault();
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => this.router.navigateByUrl('/recipes/list'),
        error: (error: any) => {
          this.errorMessage = error.error.message || 'Une erreur est survenue lors de la création de votre compte.';
          console.error('Error creating user:', error);
        }
      });
    }
  }

  protected readonly Event = Event;
}
