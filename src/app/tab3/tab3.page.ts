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
  lat;
  lng;
  constructor(private getCrud: crudapi) { 
    this.lat = this.getCrud.myhome.lat;
    this.lng = this.getCrud.myhome.lng;
  }

  
  ngOnInit(): void {
    this.lat = this.getCrud.myhome.lat;
    this.lng = this.getCrud.myhome.lng;
    this.initMap();
 
  }
  initMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: Number(this.lat),
          lng: Number(this.lng)
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
          title: this.getCrud.myhome.name,
          icon: 'blue',
          animation: 'DROP',
          disableAutoPan: true,
          position: {
            lat: Number(this.lat),
            lng: Number(this.lng)
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
