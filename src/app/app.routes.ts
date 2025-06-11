import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { MovieComponent } from './movie/movie.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'search', component: SearchComponent},
    {path: 'movie/:id', component: MovieComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'cart', component: CartComponent},
    {path: '**' , redirectTo: ''}
];
