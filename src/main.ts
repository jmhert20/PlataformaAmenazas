/*!

 =========================================================
 * Black Dashboard Pro Angular - v1.3.0
 =========================================================

 * Product Page: http://creative-tim.com/product/black-dashboard-pro-angular
 * Copyright 2021 Creative Tim (http://www.creative-tim.com)


 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDLSH0SiNkadvUosHcyVFXtky4NvAKI4_s",
  authDomain: "tesisjosehernandez.firebaseapp.com",
  projectId: "tesisjosehernandez",
  storageBucket: "tesisjosehernandez.appspot.com",
  messagingSenderId: "835954087079",
  appId: "1:835954087079:web:8741aedc8ce5644ac77782"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
