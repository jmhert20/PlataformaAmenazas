import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-widgets",
  templateUrl: "widgets.component.html",
  styleUrls:["widgets.component.scss"] 
})
export class WidgetsComponent implements OnInit {
  switch = true;
  showIframe = false;
  isLoading = false;
  today: Date = new Date();
  constructor() {}

  ngOnInit() {}

 
  generateReport() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.showIframe = true;
    }, 3000);
  }
}
