import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Chart from "chart.js";
import { HttpClient } from '@angular/common/http';

import { VulnerabilidadesService } from '../../../../../services/vulnerabilidades-service.service'
import { AmenazasService } from '../../../../../services/amenazas-service.service'
import { IntrusionesService } from '../../../../../services/intrusiones-service.service'
import { AtaquesService } from '../../../../../services/ataques-service.service'
import { style } from "@angular/animations";

interface Amenazas {
  amenaza: string;
  descripcion: string;
  nivel_gravedad: string;
  vectores_ataque: string;
  componentes: string;
  mitigacion: string;
  cantidad: number;
}
interface Ataques {
  ataque: string;
  descripcion: string;
  nivel_gravedad: string;
  vectores_ataque: string;
  componentes: string;
  mitigacion: string;
  cantidad: number;
}
interface Intrusiones {
  intrusion: string;
  descripcion: string;
  nivel_gravedad: string;
  vectores_ataque: string;
  componentes: string;
  mitigacion: string;
  cantidad: number;
}
interface Vulnerabilidades {
  vulnerabilidad: string;
  descripcion: string;
  nivel_gravedad: string;
  vectores_ataque: string;
  componentes: string;
  mitigacion: string;
  cantidad: number;
}

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls:["user.component.scss"] 
})
export class UserComponent implements AfterViewInit {
  
  constructor(private amenazasService : AmenazasService, 
    private vulnerabilidadesService: VulnerabilidadesService,
    private ataquesService: AtaquesService,
    private intrusionesService: IntrusionesService,
    private http: HttpClient
  ) {}
  
  today: Date = new Date();
  public canvas1: any;
  public canvas2: any;
  public canvas3: any;
  public canvas4: any;
  public ctx1;
  public ctx2;
  public ctx3;
  public ctx4;
  switch = true;
  showIframe = false;
  isLoading = false;
  numeroAmenazas: number = 1;
  numeroVulnerabilidades: number = 1;
  
  
  analistaNombre: string = '';
  analistaEmail: string = '';
  analistaCargo: string = '';
  analistaWeb: string = '';

  txtRecomendacionesAtaques: string = '';
  txtRecomendacionesAmenazas: string = '';
  txtRecomendacionesIntrusiones: string = '';
  txtRecomendacionesVulnerabilidades: string = '';

  vulnerabilidades: Vulnerabilidades[] = [];
  amenazas: Amenazas[] = [];
  intrusiones: Intrusiones[]=[];
  ataques: Ataques[]=[];

  @ViewChild('chart1', { static: false }) chartRef1: ElementRef;
  @ViewChild('chart2', { static: false }) chartRef2: ElementRef;
  @ViewChild('chart3', { static: false }) chartRef3: ElementRef;
  @ViewChild('chart4', { static: false }) chartRef4: ElementRef;

  
  chart1: any;
  chart2: any;
  chart3: any;
  chart4: any;
  logoDataUrl: string;

  ngAfterViewInit() {
    this.createChart1();
    this.createChart2();
    this.createChart3();
    this.createChart4();
  }

  ngAfterViewChecked() {
    if (this.showIframe && !this.chart1 && !this.chart2 && !this.chart3 && !this.chart4) {
      this.createChart1();
      this.createChart2();
      this.createChart3();
      this.createChart4();
    }
  }

  createChart1() {
    if (this.chartRef1) {
      this.vulnerabilidadesService.getThreatsByCant(this.numeroVulnerabilidades).subscribe(data =>{
        this.vulnerabilidades = data;

        const labels = this.vulnerabilidades.map(item => item.vulnerabilidad);
        const dataValues = this.vulnerabilidades.map(item => item.cantidad);

        const canvas1 = this.chartRef1.nativeElement;
        const ctx1 = canvas1.getContext('2d');

        const gradientStroke = ctx1.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, 'rgba(72,72,176,0.4)');
        gradientStroke.addColorStop(0.8, 'rgba(72,72,176,0.2)');
        gradientStroke.addColorStop(0, 'rgba(119,52,169,0)');

        this.chart1 = new Chart(ctx1, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Cantidad',
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: '#f4d7d7',
                borderWidth: 2,
                pointBackgroundColor: '#be55ed',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: '#be55ed',
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: dataValues
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      });
    }
  }

  createChart2() {
    if (this.chartRef2) {
      this.amenazasService.getThreatsByCant(this.numeroAmenazas).subscribe(data =>{
        this.amenazas = data;

        const labels = this.amenazas.map(item => item.amenaza);
        const dataValues = this.amenazas.map(item => item.cantidad);

        const canvas2 = this.chartRef2.nativeElement;
        const ctx2 = canvas2.getContext('2d');

        const gradientStroke = ctx2.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, 'rgba(72,72,176,0.4)');
        gradientStroke.addColorStop(0.8, 'rgba(72,72,176,0.2)');
        gradientStroke.addColorStop(0, 'rgba(119,52,169,0)');

        this.chart2 = new Chart(ctx2, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Cantidad',
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: '#f4d7d7',
                borderWidth: 2,
                pointBackgroundColor: '#be55ed',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: '#be55ed',
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: dataValues
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      });
    }
  }

  createChart3() {
    if (this.chartRef3) {
      this.intrusionesService.getThreats().subscribe(data =>{
        this.intrusiones = data;

        const labels = this.intrusiones.map(item => item.intrusion);
        const dataValues = this.intrusiones.map(item => item.cantidad);

        const canvas3 = this.chartRef3.nativeElement;
        const ctx3 = canvas3.getContext('2d');

        const gradientStroke = ctx3.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, 'rgba(72,72,176,0.4)');
        gradientStroke.addColorStop(0.8, 'rgba(72,72,176,0.2)');
        gradientStroke.addColorStop(0, 'rgba(119,52,169,0)');

        this.chart3 = new Chart(ctx3, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Cantidad',
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: '#f4d7d7',
                borderWidth: 2,
                pointBackgroundColor: '#be55ed',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: '#be55ed',
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: dataValues
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      });
    }
  }

  createChart4() {
    if (this.chartRef4) {
      this.ataquesService.getThreats().subscribe(data =>{
        this.ataques = data;

        const labels = this.ataques.map(item => item.ataque);
        const dataValues = this.ataques.map(item => item.cantidad);

        const canvas4 = this.chartRef4.nativeElement;
        const ctx4 = canvas4.getContext('2d');

        const gradientStroke = ctx4.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, 'rgba(72,72,176,0.4)');
        gradientStroke.addColorStop(0.8, 'rgba(72,72,176,0.2)');
        gradientStroke.addColorStop(0, 'rgba(119,52,169,0)');

        this.chart4 = new Chart(ctx4, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Cantidad',
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: '#f4d7d7',
                borderWidth: 2,
                pointBackgroundColor: '#be55ed',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: '#be55ed',
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: dataValues
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      });
    }
  }

  loadLogo() {
    this.http.get('assets/img/cotedem1.jpeg', { responseType: 'blob' }).subscribe(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.logoDataUrl = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
  }

  generarInforme(){
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.showIframe = false;
    }, 1500);

    

    const canvas1 = this.chartRef1.nativeElement;
    const chartImage1 = canvas1.toDataURL('image/png');

    const canvas2 = this.chartRef2.nativeElement;
    const chartImage2 = canvas2.toDataURL('image/png');

    
    const canvas3 = this.chartRef3.nativeElement;
    const chartImage3 = canvas3.toDataURL('image/png');

    const canvas4 = this.chartRef4.nativeElement;
    const chartImage4 = canvas4.toDataURL('image/png');

    const threatData1 = this.vulnerabilidades.map(threat => {
      return [
        { text: threat.vulnerabilidad },
        { text: threat.descripcion, },
        { text: threat.vectores_ataque,  },
        { text: threat.componentes,  },
        { text: threat.mitigacion,  },
      ];
    });

    const threatData2 = this.amenazas.map(threat => {
      return [
        { text: threat.amenaza },
        { text: threat.descripcion, },
        { text: threat.vectores_ataque,  },
        { text: threat.componentes,  },
        { text: threat.mitigacion,  },
      ];
    });

    const threatData3 = this.intrusiones.map(threat => {
      return [
        { text: threat.intrusion },
        { text: threat.descripcion, },
        { text: threat.vectores_ataque,  },
        { text: threat.componentes,  },
        { text: threat.mitigacion,  },
      ];
    });

    const threatData4 = this.ataques.map(threat => {
      return [
        { text: threat.ataque },
        { text: threat.descripcion, },
        { text: threat.vectores_ataque,  },
        { text: threat.componentes,  },
        { text: threat.mitigacion,  },
      ];
    });

    const documentDefinition = {
      content: [
        {
          image: this.logoDataUrl,
          width: 150,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        { text: 'Informe de Inteligencia de Amenazas', style: 'header',
          absolutePosition: {  y: 350 },
         },
        { text: 'Julio, 2024', alignment: 'right',
          absolutePosition: { y: 450 },
        },
        { text: '', pageBreak: 'after' },
        { 
          text:'Quito, ' + this.today ,
          absolutePosition: {y: 350 },
          style:'page2',
        },
        { 
          text: this.analistaNombre,
          absolutePosition: {y: 370 },
          style:'page2',
        },
        { 
          text: this.analistaEmail,
          absolutePosition: {y: 390 },
          style:'page2',
        },
        { 
          text: this.analistaCargo,
          absolutePosition: { y: 410 },
          style:'page2',
        },
        ,
        { 
          text: 'www.cotedem.com',
          absolutePosition: { y: 550 },
          style:'page2',
        },
        ,
        { 
          text: '+593 985588455',
          absolutePosition: { y: 565 },
          style:'page2',
        },
        { 
          text: 'Quito - Ecuador',
          absolutePosition: { y: 580 },
          style:'page2',
        },
        { text: '', pageBreak: 'after' },
        { text: 'Resumen Ejecutivo',
          style: 'header',
        },
        { text: 'Este informe proporciona una visión detallada de las amenazas cibernéticas detectadas y analizadas, de las cuales se destacan las amenazas más críticas, los patrones emergentes y las recomendaciones para la mitigación de los riesgos. Este análisis es fundamental para fortalecer la seguridad cibernética y proteger los activos de la organización.\n\n\n',
          alignment: 'justify',
        },
        { text: 'Vulnerabilidades', style: 'header', },
        { text: 'Las vulnerabilidades informáticas son debilidades o fallos en un sistema, red o software que pueden ser explotados por atacantes para obtener acceso no autorizado, causar daños o realizar actividades maliciosas. Estas vulnerabilidades pueden surgir de errores de programación, configuraciones incorrectas, falta de actualizaciones de seguridad, o incluso a través de técnicas de ingeniería social. Identificar y mitigar estas vulnerabilidades es crucial para proteger la integridad, confidencialidad y disponibilidad de la información y los recursos tecnológicos de una organización.\n\n\n' ,
          alignment: 'justify',
        },
        {
          image: chartImage1,
          width: 500
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*','*', '*', '*'],
            body: [
              [
                { text: 'Nommbre', style: 'tableHeader' },
                { text: 'Descripcion', style: 'tableHeader' },
                { text: 'Vectores de ataque', style: 'tableHeader' },
                { text: 'Componentes', style: 'tableHeader' },
                { text: 'Mitigacion', style: 'tableHeader' }
              ],
              ...threatData1
            ]
          },
          style: 'threatTable'
        },
        {
          text:'\n\nInforme del analista:',
          style:'titulo'
        },
        {
          text: this.txtRecomendacionesVulnerabilidades,
          alignment:'justify'
        },
        
        




        { text: 'Amenazas', style: 'header', },
        { text: 'Las amenazas informáticas son cualquier acción, evento o circunstancia que tiene el potencial de causar daño a los sistemas de información, redes o datos. Estas amenazas pueden ser de origen externo, como ataques cibernéticos perpetrados por hackers, malware, phishing, y ataques de denegación de servicio, o de origen interno, como empleados descontentos, errores humanos o fallos en el sistema. Las amenazas pueden comprometer la confidencialidad, integridad y disponibilidad de la información, y es esencial identificar y gestionar estas amenazas para mantener la seguridad y el buen funcionamiento de los sistemas informáticos.\n\n\n' ,
          alignment: 'justify',
        },
        {
          image: chartImage2,
          width: 500
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*','*', '*', '*'],
            body: [
              [
                { text: 'Nommbre', style: 'tableHeader' },
                { text: 'Descripcion', style: 'tableHeader' },
                { text: 'Vectores de ataque', style: 'tableHeader' },
                { text: 'Componentes', style: 'tableHeader' },
                { text: 'Mitigacion', style: 'tableHeader' }
              ],
              ...threatData2
            ]
          },
          style: 'threatTable'
        },
        {
          text:'\n\nInforme del analista:',
          style:'titulo'
        },
        {
          text: this.txtRecomendacionesAmenazas,
          alignment:'justify'
        }, 
      
        



        { text: 'Intrusiones', style: 'header', },
        {
          image: chartImage3,
          width: 500
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*','*', '*', '*'],
            body: [
              [
                { text: 'Nommbre', style: 'tableHeader' },
                { text: 'Descripcion', style: 'tableHeader' },
                { text: 'Vectores de ataque', style: 'tableHeader' },
                { text: 'Componentes', style: 'tableHeader' },
                { text: 'Mitigacion', style: 'tableHeader' }
              ],
              ...threatData3
            ]
          },
          style: 'threatTable'
        },
        {
          text:'\n\nInforme del analista:',
          style:'titulo'
        },
        {
          text: this.txtRecomendacionesIntrusiones,
          alignment:'justify'
        },


        


        { text: 'Ataques', style: 'header', },
        {
          image: chartImage4,
          width: 500
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*','*', '*', '*'],
            body: [
              [
                { text: 'Nommbre', style: 'tableHeader' },
                { text: 'Descripcion', style: 'tableHeader' },
                { text: 'Vectores de ataque', style: 'tableHeader' },
                { text: 'Componentes', style: 'tableHeader' },
                { text: 'Mitigacion', style: 'tableHeader' }
              ],
              ...threatData4
            ]
          },
          style: 'threatTable'
        },
        {
          text:'\n\nInforme del analista:',
          style:'titulo'
        },
        {
          text: this.txtRecomendacionesAtaques,
          alignment:'justify'
        },
        { text: '', pageBreak: 'after' },
        {
          text: '\nRecomendaciones',
          style: 'titulo'
        },
        {
          text:'\n\n1. Mejora en la protección contra Ransomware:'
        },
        {
          text:'\t- Implementar soluciones de respaldo y recuperación que sean robustas y probadas regularmente.',
          alignment:'justify'
        },
        {
          text:'\t- Configurar sistemas de detección y respuesta ante amenazas (EDR) para identificar y bloquear actividades sospechosas.',
          alignment:'justify'
        },
        {
          text:'\n\n2. Fortalecimiento de la conciencia de seguridad:'
        },
        {
          text:'\t- Realizar capacitaciones periódicas sobre ciberseguridad para todos los empleados, enfocándose en la detección de pishing y otras técnicas de ingeniería social.',
          alignment:'justify'
        },
        {
          text:'\t- Utilizar simulaciones de ataques para evaluar y mejorar la respuesta de los empleados ante posibles amenazas.',
          alignment:'justify'
        },
        {
          text:'\n\n3. Actualización de políticas de seguridad:'
        },
        {
          text:'\t- Revisar y actualizar las políticas de seguridad de la información para asegurar que estén alineadas con las mejores prácticas actuales y las normativas internacionales como la ISO 27001.',
          alignment:'justify'
        },
        {
          text:'\t- Implementar una política de contraseñas seguras y multifactor (MFA) para todas las cuentas de usuario.',
          alignment:'justify'
        },
      
      ],
      styles: {
        header: {
          fontSize: 25,
          bold: true,
          alignment: 'center',
          background: 'red',
          color:'white',
          margin: [10, 10, 10, 10],
          padding:[10, 10, 10, 10],
        },
        titulo:{
          bold: true,
        },
        logo: {
          alignment: 'center',
          width: 150
        },
        page2:{
          alignment: 'center',
          margin: [10, 10, 10, 10],
          padding:[10, 10, 10, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
          fillColor: '#eeeeee',
          alignment: 'center'
        },
        tableCell: {
          margin: [0, 5, 0, 5]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }



  previsualizarInforme() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.showIframe = true;
    }, 1500);

    this.createChart1();
    this.loadLogo();
   
  }


  ngOnInit() {
    
  }
}
