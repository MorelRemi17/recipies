import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/User.model";
import {UserService} from "../../core/services/User.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  user!: User;
  id!: number;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[0-9]).*$')
      ]]
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.userService.getUserById(this.id).subscribe(user => {
        this.user = user;
        this.userForm.patchValue(this.user);
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = {...this.user, ...this.userForm.value};
      this.userService.updateUser(this.id, updatedUser).subscribe({
        next: () => this.router.navigateByUrl(`/users/${this.user.id}`),
        error: err => console.error('Error updating user:', err)
      });
    }
  }
}
