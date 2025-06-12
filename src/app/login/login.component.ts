import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, MatInputModule, MatButtonModule, FormsModule, MatCardModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string = ''
  public password: string = ''

  constructor(private router: Router) {
    if (UserService.getActiveUser()) {
      router.navigate(['/'])
    }
  }

  public doLogin() {
    if (this.username == '' || this.password == '') {
      alert('Username and password are required')
      return
    }
    if (UserService.login(this.username, this.password)) {
      this.router.navigate(['/'])
    }
  }
}