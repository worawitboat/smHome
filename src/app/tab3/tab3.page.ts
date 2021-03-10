import { Component } from '@angular/core';
import { GoogleMapOptions, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  map: any;
  constructor() {}

  ngOnInit(): void {
    
    this.initMap();
  }
  initMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: Number(15.117235),
          lng: Number(104.9006572)
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
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          disableAutoPan: true,
          position: {
            lat: Number(15.117235),
            lng: Number(104.9006572)
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
