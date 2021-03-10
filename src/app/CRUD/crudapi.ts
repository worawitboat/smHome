import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class crudapi {
  temp: any;
  myhome = {
    name:"",
    lat:15.154463,
    lng:104.4434141
  };
  home: any;
  // data: any = [
  //     {
  //         id: 0,
  //         type: "light",
  //         name: "ไฟห้องโถง",
  //         home: "บ้านพัก",
  //         status: true
  //     },
  //     {
  //         id: 1,
  //         type: "fan",
  //         name: "พัดลมห้องโถง",
  //         home: "บ้านพัก",
  //         status: true
  //     },
  //     {
  //         id: 2,
  //         type: "curtain",
  //         name: "ผ้าม่านห้องโถง",
  //         home: "บ้านพัก",
  //         status: true
  //     },
  //     {
  //         id: 3,
  //         type: "light",
  //         name: "ไฟห้องครัว",
  //         home: "บ้านพัก",
  //         status: false
  //     },
  //     {
  //         id: 4,
  //         type: "fan",
  //         name: "พัดลมห้องนอน",
  //         home: "บ้านพัก",
  //         status: false
  //     }
  // ]
  //   temp: Observable<any[]>;
  //   data: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  //   fhomes$: BehaviorSubject<string | null>;
  data: any;
  

  constructor(db: AngularFireDatabase,private fs: AngularFirestore) {
    // this.fhomes$ = new BehaviorSubject(null);
    // this.data = db.list('/items', (ref) =>
    //   ref.orderByChild('home').equalTo('บ้านพัก')
    // );
    // this.data = db.list('/homes', (ref) =>
    //   ref.orderByChild('บ้านพัก').equalTo('large')
    // );
    this.data = db.list('homes').valueChanges();
    // this.temp = firestore.collection('data').valueChanges();
  }

  readMyHome(){
    return this.fs.collection('home').snapshotChanges();
  }
  readHomeSelect(myHome){
    return this.fs.doc('home/'+myHome);
  }

  readData() {
    return this.data;
    // return this.fs.collection('AEC').snapshotChanges();
  }
  addHome(home) {
    this.temp = this.fs.collection('home');
    this.temp.add({
        name:home.name,
        lat:home.lat,
        lng:home.lng
        // Other info you want to add here
    });
    this.home.push(home);
  }
  addData() {
    // this.temp = this.fs.collection('AEC');
    // this.temp.add({
    //     img: 'https://s.isanook.com/mn/0/ud/13/69225/cambodia.jpg',
    //     cname: 'Cambodia',
    //     capital: 'Phnom Penh'
    //     // Other info you want to add here
    // });
  }

  delData(docId: any) {
    // return this.fs.doc('AEC/' + docId).delete();
  }
  updateData(docId: any) {
    if (this.data[docId].status == false) {
      this.data[docId].status = true;
    } else {
      this.data[docId].status = false;
    }
    // return this.fs.doc('AEC/' + docId).update({
    //     img: 'https://img.kapook.com/u/2015/thachapol/zzz999999999/d11.jpg',
    //     cname: 'UUUU',

    //     // Other info you want to add here
    // })
  }
}
