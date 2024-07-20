import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls:["user.component.scss"] 
})
export class UserComponent implements OnInit {
  constructor() {}
  today: Date = new Date();
  public canvas: any;
  public ctx;
  switch = true;
  showIframe = false;
  showIframe2 = false;
  isLoading = false;
  
  analistaNombre: string = '';
  analistaEmail: string = '';

  generateReport2(){
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.showIframe = false;
      this.showIframe2 = true;
    }, 3000);
  }


  generateReport() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.showIframe = true;
      this.showIframe2 = false;
    }, 3000);
    var gradientChartOptionsConfigurationPurple = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(186,84,245,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(186,84,245,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };

    var gradientChartOptionsConfigurationBlue = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };

    var gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(253,93,147,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(253,93,147,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };

    var gradientBarChartConfigurationWithGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(253,93,147,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(253,93,147,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };

    this.canvas = document.getElementById("chartSimpleWithGradient");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.4)");
    gradientStroke.addColorStop(0.8, "rgba(72,72,176,0.2)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    var myChart = new Chart(this.ctx, {
      type: "line",
      responsive: true,
      data: {
        labels: ["CVE-2024-3094", "CVE-2024-3400", "CVE-2024-1709", "CVE-2024-0185", "CVE-2024-0100", "CVE-2024-TESISS"],
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#f4d7d7",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#be55ed",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#be55ed",
            //pointHoverBorderColor:'rgba(35,46,55,1)',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [62, 45, 45, 50, 40, 70]
          }
        ]
      },
      options: gradientChartOptionsConfigurationPurple
    });

    this.canvas = document.getElementById("chartWithNumbersAndGrid");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(0,135,191,0.2)");
    gradientStroke.addColorStop(0.8, "rgba(0,135,191,0.1)");
    gradientStroke.addColorStop(0, "rgba(0,84,119,0)"); //blue colors

    var myChart = new Chart(this.ctx, {
      type: "line",
      responsive: true,
      data: {
        labels: ["Cerberus (ex-Amnesia)", "CoralRaider", "LabHost", "KageNoHitobito", "Mallox", "SideCopy"],
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#2380f7",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#2380f7",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#2380f7",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [320, 450, 270, 380, 320, 480]
          }
        ]
      },
      options: gradientChartOptionsConfigurationBlue
    });

    this.canvas = document.getElementById("BarChart");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(253,93,147,0.8)");
    gradientStroke.addColorStop(0, "rgba(253,93,147,0)"); //blue colors

    var myChart = new Chart(this.ctx, {
      type: "bar",
      responsive: true,
      data: {
        labels: ["RedLine Stealer", "purecrypter", "Tsunami IRC", "DillJuice", "Darkmoon", "8base"],
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#ff5991",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [80, 100, 70, 80, 120, 80]
          }
        ]
      },
      options: gradientBarChartConfigurationWithGrid
    });

    this.canvas = document.getElementById("MultipleBarsChart");
    this.ctx = this.canvas.getContext("2d");

    var myChart = new Chart(this.ctx, {
      type: "bar",
      responsive: true,
      data: {
        labels: ["ransomware", "DarkGate", "rat", "infostealer", "trojan", "PikaBot"],
        datasets: [
          {
            label: "Recibidos",
            fill: true,
            backgroundColor: "#ff8a76",
            hoverBackgroundColor: " #ff8a76",
            borderColor: "#ff8a76",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [80, 100, 70, 80, 120, 80]
          },
          {
            label: "Solventados",
            fill: true,
            backgroundColor: "#2782f0",
            hoverBackgroundColor: " #2782f0",
            borderColor: "#2782f0",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [60, 100, 40, 59, 100, 60]
          }
        ]
      },
      options: gradientBarChartConfiguration
    });

    this.canvas = document.getElementById("PieChart");
    this.ctx = this.canvas.getContext("2d");

    var myChart = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: [1, 2],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#00c09d", "#e2e2e2"],
            borderWidth: 0,
            data: [60, 40]
          }
        ]
      },
      options: {
        cutoutPercentage: 70,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },

        scales: {
          yAxes: [
            {
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],

          xAxes: [
            {
              display: 0,
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    });

    this.canvas = document.getElementById("PieChartGradient");
    this.ctx = this.canvas.getContext("2d");

    var myChart = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#ff8779", "#2a84e9", "#e2e2e2"],
            borderWidth: 0,
            data: [60, 40, 20]
          }
        ]
      },
      options: {
        cutoutPercentage: 70,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },

        scales: {
          yAxes: [
            {
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],

          xAxes: [
            {
              display: 0,
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    });
  }
  ngOnInit() {
    
  }
}
