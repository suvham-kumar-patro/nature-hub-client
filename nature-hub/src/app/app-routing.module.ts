import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RemedyComponent } from './remedy/remedy.component';
import { HealthTipsComponent } from './health-tips/health-tips.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'remedy', component: RemedyComponent, canActivate: [AuthGuard] },
  { path: 'HealthTips', component: HealthTipsComponent, canActivate: [AuthGuard] },
  { path: 'Shopping', component: ShoppingComponent, canActivate: [AuthGuard] },
  { path: 'Cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
