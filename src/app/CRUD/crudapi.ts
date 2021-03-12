import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class crudapi {
  temp: any;
  myhome = {
    id:"",
    name:"",
    lat:"",
    lng:"",
  };
  tasksRef: AngularFireList<any>
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
  

  constructor(private db: AngularFireDatabase,private fs: AngularFirestore) {
  
  }

  readMyHome(){
    return this.fs.collection('home').snapshotChanges();
  }
  readHomeSelect(myHomeId){
    return this.fs.collection('home').doc(myHomeId).valueChanges();
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
  addDevice(homeId,item) {
    this.fs.collection('home').doc(homeId).set({device:item},{ merge: true});
   
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

  delDevice(homeId,item) {
    this.fs.collection('home').doc(homeId).set({ device: item },{ merge: true });
  }
  updateData(homeId,item,i) {
    
    this.db.list(`/home/${homeId}/device`).update(String(i),{status:item[i].status})

    this.fs.collection('home').doc(homeId).set({ device: item },{ merge: true });
    
  }

  updateDevice(homeId,item){
    
    this.fs.collection('home').doc(homeId).set({ device: item },{ merge: true });

  }
}
