
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class crudapi {
    temp: any;
    home: any = [
        {name:'บ้าน1'},
        {name:'บ้าน2'},
        {name:'บ้านพัก'}
    ]
    data: any = [
        {
            id: 0,
            type: "light",
            name: "ไฟห้องโถง",
            home: "บ้านพัก",
            status: true
        },
        {
            id: 1,
            type: "fan",
            name: "พัดลมห้องโถง",
            home: "บ้านพัก",
            status: true
        },
        {
            id: 2,
            type: "curtain",
            name: "ผ้าม่านห้องโถง",
            home: "บ้านพัก",
            status: true
        },
        {
            id: 3,
            type: "light",
            name: "ไฟห้องครัว",
            home: "บ้านพัก",
            status: false
        },
        {
            id: 4,
            type: "fan",
            name: "พัดลมห้องนอน",
            home: "บ้านพัก",
            status: false
        }
    ]

    constructor() { }

    readData() {
        return this.data;
        // return this.fs.collection('AEC').snapshotChanges();
    }
    readHome(){
        return this.home;
    }
    addHome(home){
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
            this.data[docId].status = true
        } else {
            this.data[docId].status = false
        }
        // return this.fs.doc('AEC/' + docId).update({
        //     img: 'https://img.kapook.com/u/2015/thachapol/zzz999999999/d11.jpg',
        //     cname: 'UUUU',

        //     // Other info you want to add here
        // })

    }
}