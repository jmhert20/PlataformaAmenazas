import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { AmenazasService } from '../../../../services/amenazas-service.service'
import { VulnerabilidadesService } from '../../../../services/vulnerabilidades-service.service'
import { IntrusionesService } from '../../../../services/intrusiones-service.service'
import { AtaquesService } from '../../../../services/ataques-service.service'


interface Amenazas {
  amenaza: string;
  cantidad: number;
}
interface Ataques {
  ataque: string;
  cantidad: number;
}
interface Intrusiones {
  intrusion: string;
  cantidad: number;
}
interface Vulnerabilidades {
  vulnerabilidad: string;
  cantidad: number;
}



@Component({
  selector: "app-charts",
  templateUrl: "charts.component.html",
  styleUrls:["charts.component.scss"] 
})
export class ChartsComponent implements OnInit {
  isLoading:boolean=true;
  public canvas: any;
  public ctx;
  amenazas: Amenazas[] = [];
  totalAmenazas: number =0;

  vulnerabilidades: Vulnerabilidades[] = [];
  totalVulnerabilidades: number =0;

  intrusiones: Intrusiones[] = [];
  totalIntrusiones: number =0;
  
  ataques: Ataques[] = [];
  totalAtaques: number =0;

  constructor(private amenazasService : AmenazasService, 
    private vulnerabilidadesService: VulnerabilidadesService,
    private ataquesService: AtaquesService,
    private intrusionesService: IntrusionesService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.amenazasService.getThreats().subscribe(data => {
      this.amenazas = data;

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

      const labels = this.amenazas.map(item => item.amenaza);
      const dataValues = this.amenazas.map(item => item.cantidad);

      this.totalAmenazas = dataValues.reduce((a, b) => a + b, 0);
  
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
          labels: labels,
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
              data: dataValues
            }
          ]
        },
        options: gradientChartOptionsConfigurationPurple
      });
  
      console.log('labels ', labels)
      console.log('datavalues ', dataValues)
    });

    this.vulnerabilidadesService.getThreats().subscribe(data =>{
      this.vulnerabilidades = data;
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

      const labels = this.vulnerabilidades.map(item => item.vulnerabilidad);
      const dataValues = this.vulnerabilidades.map(item => item.cantidad);

      this.totalVulnerabilidades = dataValues.reduce((a, b) => a + b, 0);

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
          labels: labels,
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
              data: dataValues
            }
          ]
        },
        options: gradientChartOptionsConfigurationBlue
      });

    });

    this.intrusionesService.getThreats().subscribe(data => {
      this.intrusiones = data;

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

      const labels = this.intrusiones.map(item => item.intrusion);
      const dataValues = this.intrusiones.map(item => item.cantidad);

      this.totalIntrusiones = dataValues.reduce((a, b) => a + b, 0);

      this.canvas = document.getElementById("BarChart");
      this.ctx = this.canvas.getContext("2d");
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(253,93,147,0.8)");
      gradientStroke.addColorStop(0, "rgba(253,93,147,0)"); //blue colors

      var myChart = new Chart(this.ctx, {
        type: "bar",
        responsive: true,
        data: {
          labels: labels,
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
              data: dataValues
            }
          ]
        },
        options: gradientBarChartConfiguration
      });
    });
    
    this.ataquesService.getThreats().subscribe(data => {
      this.ataques = data;

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

      const labels = this.ataques.map(item => item.ataque);
      const dataValues = this.ataques.map(item => item.cantidad);

      this.totalAtaques = dataValues.reduce((a, b) => a + b, 0);

      this.canvas = document.getElementById("MultipleBarsChart");
      this.ctx = this.canvas.getContext("2d");

      var myChart = new Chart(this.ctx, {
        type: "bar",
        responsive: true,
        data: {
          labels: labels,
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
              data: dataValues
            },
            // {
            //   label: "Solventados",
            //   fill: true,
            //   backgroundColor: "#2782f0",
            //   hoverBackgroundColor: " #2782f0",
            //   borderColor: "#2782f0",
            //   borderWidth: 2,
            //   borderDash: [],
            //   borderDashOffset: 0.0,
            //   data: [60, 100, 40, 59, 100, 60]
            // }
          ]
        },
        options: gradientBarChartConfigurationWithGrid
      });
   });

   this.isLoading = false;
  }
}
