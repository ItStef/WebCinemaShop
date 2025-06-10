import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public displayedColumns: string[] = ['id', 'username', 'password', 'firstName', 'lastName','email', 'phone', 'address', 'favoriteGenres'];

  public user: UserModel | null = null
  public userCopy: UserModel | null = null
  public destinationList: string[] = []

  public oldPasswordValue = ''
  public newPasswordValue = ''
  public repeatPasswordValue = ''

  constructor(private router: Router) {
    if (!UserService.getActiveUser()) {
      router.navigate(['/home'])
      return
    }
    this.user = UserService.getActiveUser()
    this.userCopy = UserService.getActiveUser()
  }


}
