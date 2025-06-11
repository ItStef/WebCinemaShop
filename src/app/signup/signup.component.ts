import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, CommonModule, NgFor, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: UserModel = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    favoriteGenres: []
  };

  confirmPassword: string = '';
  constructor(private router: Router) {
    if (UserService.getActiveUser()) {
      this.router.navigate(['/']);
    }
  }
  genreList: string[] = MovieService.getGenres();

  doSignup() {
    // Basic validation
    if (!this.user.username || !this.user.password|| !this.confirmPassword || !this.user.email || !this.user.address || !this.user.firstName || !this.user.lastName || !this.user.phone) {
      alert('All fields are required');
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      alert('Passwords don\'t match');
      return;
    }

    if (this.user.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (UserService.getUsers().some(u => u.username === this.user.username)) {
      alert('Username already exists');
      return;
    }

    this.user.id = Math.random().toString(36).substring(2, 15);

    const result = UserService.createUser(this.user);
    UserService.login(this.user.username, this.user.password);
    alert('Account created successfully!');
    this.router.navigate(['/']);
  }
}