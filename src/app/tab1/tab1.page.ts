import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { crudapi } from '../CRUD/crudapi';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  Obj: any = [];
  home: any; // บ้านที่มีทั้งหมด
  myHome: String = 'บ้านของฉัน';
  homeSelect: any;
  device: any = [];
  constructor(
    private getCrud: crudapi,
    private route: Router,
    public toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    // ตัวอย่างจาก firebase
    // -------------------------------
    this.getCrud.readMyHome().subscribe((data) => {
      this.home = data.map((e) => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'.toString()],
          lat: e.payload.doc.data()['lat'.toString()],
          lng: e.payload.doc.data()['lng'.toString()],
          device: e.payload.doc.data()['device'],
        };
      });
      // console.log('home => ', this.home);
    });
  }

  OpenOrClose(item, i) {
    this.device[i].status = !item.status;

    this.getCrud.updateData(this.getCrud.myhome.id, this.device,i);
  }
  discover() {
    this.route.navigate(['/tabs/tab2']);
  }

  presentAlertRadio() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Radio';
    alert.inputs = [];
    alert.buttons = [
      {
        text: 'เพิ่มบ้าน',
        handler: (data) => {
          this.addHome();
        },
      },
      {
        text: 'เลือก',
        handler: (data) => {
          const temp = JSON.stringify(data);

          this.getCrud.readHomeSelect(JSON.parse(temp).id).subscribe((data) => {
            this.device = data['device'];
            this.getCrud.myhome.id = JSON.parse(temp).id;
            this.getCrud.myhome.name = JSON.parse(temp).name;
            this.getCrud.myhome.lat = JSON.parse(temp).lat;
            this.getCrud.myhome.lng = JSON.parse(temp).lng;

            // this.getCrud.myhome = JSON.parse(temp);
          });

          this.myHome = JSON.parse(temp).name;
        },
      },
    ];
    for (let i of this.home) {
      alert.inputs.push({
        type: 'radio',
        label: i.name,
        value: {
          id: i.id,
          name: i.name,
          lat: i.lat,
          lng: i.lng,
        },
      });
    }

    document.body.appendChild(alert);
    return alert.present();
  }

  addHome() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'เพิ่มบ้าน';
    alert.inputs = [
      {
        name: 'newHome',
        id: 'newHome',
        placeholder: 'ชื่อบ้าน',
      },
      {
        name: 'lat',
        id: 'lat',
        placeholder: 'Latitude',
      },
      {
        name: 'lng',
        id: 'lng',
        placeholder: 'Lngitude',
      },
    ];
    alert.buttons = [
      {
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        },
      },
      {
        text: 'ตกลง',
        handler: (data) => {
          const newHome = {
            name: data.newHome,
            lat: data.lat,
            lng: data.lng,
          };
          this.getCrud.addHome(newHome);
        },
      },
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  edit(data, i) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'อุปกรณ์';
    alert.inputs = [
      {
        name: 'deviceName',
        id: 'deviceName',
        value: data.name,
        placeholder: 'ชื่ออุปกรณ์',
      },
    ];
    alert.buttons = [
      {
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        },
      },
      {
        text: 'ตกลง',
        handler: (d) => {
          this.device[i].name = d.deviceName;
          this.getCrud.updateDevice(this.getCrud.myhome.id, this.device);
        },
      },
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  del(item, i) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'ต้องการลบอุปกรณ์หรือไม่';
    alert.buttons = [
      {
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {},
      },
      {
        text: 'ตกลง',
        handler: () => {
          let index = this.device.indexOf(item);
          if (index > -1) {
            this.device.splice(index, 1);
          }
          this.getCrud.delDevice(this.getCrud.myhome.id, this.device);
        },
      },
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  addDevice() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'ประเภทอุปกรณ์';
    alert.inputs = [
      {
        type: 'radio',
        label: 'ไฟ',
        value: 'light',
      },
      {
        type: 'radio',
        label: 'ผ้าม่าน',
        value: 'curtain',
      },
      {
        type: 'radio',
        label: 'พัดลม',
        value: 'fan',
      },
    ];
    alert.buttons = [
      {
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        },
      },
      {
        text: 'ตกลง',
        handler: (data) => {
          this.nextStepAddDevice(data);
        },
      },
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  nextStepAddDevice(data) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'อุปกรณ์';
    alert.inputs = [
      {
        name: 'deviceName',
        id: 'deviceName',
        placeholder: 'ชื่ออุปกรณ์',
      },
    ];
    alert.buttons = [
      {
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        },
      },
      {
        text: 'ตกลง',
        handler: (i) => {
          const item = {
            type: data,
            name: i.deviceName,
            status: false,
          };
          this.device.push(item);
          this.getCrud.addDevice(this.getCrud.myhome.id, this.device);
        },
      },
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'กรุณาเลือกบ้านก่อน',
      duration: 3000,
      cssClass: 'Toast',
    });
    toast.present();
  }

  // Graph
  ionViewDidEnter() {
    this.plotDynamicSplineChart();
  }

  plotDynamicSplineChart() {
    let myChart = HighCharts.chart('highcharts', {
      chart: {
        type: 'spline',
        animation: true, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function () {
            var series = this.series;
            setInterval(function () {
              var x = new Date().getTime(), // current time
                y = Math.random() * (35 - 33) + 33,
                yh = Math.random() * (34 - 28) + 28;
              series[0].addPoint([x, y], true, true);
              series[1].addPoint([x, yh], true, true);
            }, 10000);
          },
        },
      },

      time: {
        useUTC: false,
      },

      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
      },
      yAxis: {
        title: {
          text: '',
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080',
          },
        ],
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}',
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      series: [
        {
          name: 'อุณหภูมิ',
          type: undefined,
          data: (function () {
            var data = [],
              time = new Date().getTime(),
              i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 10000,
                y: Math.random() * (36 - 33) + 33,
              });
            }
            return data;
          })(),
        },
        {
          name: 'ความชื้น',
          type: undefined,
          data: (function () {
            var data = [],
              time = new Date().getTime(),
              i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 10000,
                y: Math.random() * (34 - 28) + 28,
              });
            }
            return data;
          })(),
        },
      ],
    });
  }
}
