import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HealthTipsComponent } from './health-tips/health-tips.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RemedyComponent } from './remedy/remedy.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt.interceptor.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HealthTipsComponent,
    HomeComponent,
    NavComponent,
    RemedyComponent,
    ShoppingComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [provideHttpClient(withFetch(), withInterceptorsFromDi()),{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
