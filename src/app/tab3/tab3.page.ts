import { Component } from '@angular/core';
import { GoogleMapOptions, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { crudapi } from '../CRUD/crudapi';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  map: any;
  myHome:any;
  constructor(private getCrud: crudapi) {}

  ngOnInit(): void {
    
    
    this.myHome = this.getCrud.myhome;
    
    this.initMap();
    
    
  }
  initMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: Number(this.myHome.lat),
          lng: Number(this.myHome.lng)
        },
        zoom: 18,
        tilt: 30,

      },
    };
    this.map = GoogleMaps.create('map_canvas',
      mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.addMarker({
          title: this.myHome.name,
          icon: 'blue',
          animation: 'DROP',
          disableAutoPan: true,
          position: {
            lat: Number(this.myHome.lat),
          lng: Number(this.myHome.lng)
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
              });
          });
      });
  }
  
}
