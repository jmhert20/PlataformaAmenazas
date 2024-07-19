import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit, OnDestroy {
  focus;
  focus1;
  email: string;
  password: string;

  constructor(private router: Router) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
  }
  onSubmit() {
    console.log('email ', this.email)
    console.log('password ', this.password)
    if ((this.email === 'jhernandez@cotedem.com' || this.email === 'acaicedo@cotedem.com')  && this.password === '12345') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
}
