import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {User} from "../../models/User.model";
import {UserService} from "../../core/services/User.service";
import {ToastService} from "../../core/services/Toast.service";


@Component({
  selector: 'app-user-by-id',
  templateUrl: './user-by-id.component.html',
  styleUrls: ['./user-by-id.component.scss']
})
export class UserByIdComponent implements OnInit {
  user!: User;

  constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private router: Router,
      private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.userService.getUserById(id).subscribe(
          (user) => {
            this.user = user;
          },
          (error) => {
            console.error('Error fetching user details', error);
            this.toastService.show('Erreur', 'Erreur lors de la récupération des détails de l\'utilisateur');
          }
      );
    });
  }

  deleteUser(): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.toastService.show('Succès', 'Utilisateur supprimé avec succès');
          this.router.navigateByUrl('');
        },
        error: (err) => {
          this.toastService.show('Erreur', 'Erreur lors de la suppression de l\'utilisateur');
          console.error("Erreur lors de la suppression de l'utilisateur", err);
        }
      });
    }
  }
}
