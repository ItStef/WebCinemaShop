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


  public email: string = ''
  public password: string = ''

  constructor(private router: Router) {
    if (UserService.getActiveUser()) {
      router.navigate(['/user'])
      return
    }
  }

  public doLogin() {
    if (UserService.login(this.email, this.password)) {
      this.router.navigate(['/user'])
      return
    }
    if (this.email == '' || this.password == '') {
      alert('Email and password are required')
      return
    }
    alert('Invalid email or password')
  }


}
