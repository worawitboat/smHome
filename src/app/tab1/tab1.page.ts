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
  myHome: String = "บ้านพัก";
  constructor(private getCrud: crudapi, private route: Router) { }

  ngOnInit(): void {
    // ตัวอย่างจาก firebase 
    // -------------------------------
    // this.getCrud.readData().subscribe(data => {
    //   this.Obj = data.map(e => {
    //     return {
    //       // id: e.payload.doc.id,
    //       // name: e.payload.doc.data()['name'.toString()],
    //       // type: e.payload.doc.data()['type'.toString()],
    //       // status: e.payload.doc.data()['status'.toString()],


    //     }
    //   });
    //   console.log(this.Obj);
    // });
    // --------------------------------


    // ------------------------------
    this.home = this.getCrud.readHome();

    let tempObj = [];
    let temp = this.getCrud.readData();
    let index = 0;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].home == this.myHome) {
        tempObj.push(temp[i])
        index++;
      }
      if (temp[i].home == this.myHome && index == 2) {
        this.Obj.push(tempObj);
        tempObj = [];
        index = 0;
      }
    }
    if (tempObj.length != 0) {
      this.Obj.push(tempObj);
    }

    //ทำให้ array เป็นแบบนี้
    // [[],[]],
    // [[],[]]...
    // เพื่อ วนลูปในหน้าแอพให้เป็นแบบนั้น 
    //---------------------------------

  }

  OpenOrClose(item) {
    this.getCrud.updateData(item.id);
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

        }
      }
    ];
    for (let i of this.home) {
      alert.inputs.push({ type: 'radio', label: i.name, value: i.name })
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
            name: data.newHome
          }
          this.getCrud.addHome(newHome);
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

}
