import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { crudapi } from '../CRUD/crudapi';





@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  Obj: any = [];
  home: any; // บ้านที่มีทั้งหมด
  myHome: String = "บ้านของฉัน";
  homeSelect: any;
  device:any = [];
  constructor(private getCrud: crudapi, private route: Router) { }

  ngOnInit(): void {
    // ตัวอย่างจาก firebase 
    // -------------------------------
    this.getCrud.readMyHome().subscribe(data => {
      this.home = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'.toString()],
          lat: e.payload.doc.data()['lat'.toString()],
          lng: e.payload.doc.data()['lng'.toString()],
          device: e.payload.doc.data()['device']
        }
      });

      console.log("home => ", this.home);
    });


  }

  OpenOrClose(item,i) {
    this.device[i].status = !item.status;
    
    this.getCrud.updateData(this.getCrud.myhome.id,this.device);
  }
  discover() {
    this.route.navigate(['/tabs/tab2'])
  }

  presentAlertRadio() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Radio';
    alert.inputs = [
    ];
    alert.buttons = [
      {
        text: 'เพิ่มบ้าน',
        handler: (data) => {
          this.addHome();
        }
      }, {
        text: 'เลือก',
        handler: (data) => {
          const temp = JSON.stringify(data);
          this.getCrud.myhome.id = JSON.parse(temp).id;
          this.getCrud.myhome.name = JSON.parse(temp).name;
          this.getCrud.myhome.lat = JSON.parse(temp).lat;
          this.getCrud.myhome.lng = JSON.parse(temp).lng;
          
          this.getCrud.readHomeSelect(JSON.parse(temp).id).subscribe(data => {
            this.device = data['device'];
            
          });
          
          this.myHome = this.getCrud.myhome.name;

        }
      }
    ];
    for (let i of this.home) {
      alert.inputs.push({
        type: 'radio', label: i.name, value: {
          id: i.id,
          name: i.name,
          lat: i.lat, lng: i.lng
        }
      })
    }

    document.body.appendChild(alert);
    return alert.present();
  }

  addHome() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Prompt!';
    alert.inputs = [
      {
        name: 'newHome',
        id: 'newHome',
        placeholder: 'ชื่อบ้าน'
      },
      {
        name: 'lat',
        id: 'lat',
        placeholder: 'Latitude'
      },
      {
        name: 'lng',
        id: 'lng',
        placeholder: 'Lngitude'
      },

    ];
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel')
        }
      }, {
        text: 'Ok',
        handler: (data) => {
          const newHome = {
            name: data.newHome,
            lat: data.lat,
            lng: data.lng
          }
          this.getCrud.addHome(newHome);
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  edit(item) {
    console.log(item);

  }


  addDevice() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Prompt!';
    alert.inputs = [
      {
        name: 'deviceName',
        id: 'deviceName',
        placeholder: 'ชื่ออุปกรณ์'
      },
      {
        type:'radio',
        label: 'type',
        value: 'light',
        placeholder: 'Light'
      },
      {
        type:'radio',
        label: 'type',
        value: 'curtain',
        placeholder: 'Curtain'
      },


    ];
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel')
        }
      }, {
        text: 'Ok',
        handler: (data) => {
          const newHome = {
            name: data.newHome,
            lat: data.lat,
            lng: data.lng
          }
          this.getCrud.addHome(newHome);
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }


}
