import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

@Component({
  selector: 'app-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css'],
})
export class GeomapComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.getPosition().subscribe(
      (position) => {
        const latLng = L.latLng(position.latitude, position.longitude);
        this.initMap(latLng);
      },
      (error) => {
        console.log(error);
      }
    );
  }

 markerIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Emoji_u2665.svg',
    iconSize: [48, 48]
  });

  initMap(latLng: L.LatLng) {
    const map = L.map('map').setView(latLng, 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    const marker = L.marker(latLng, { icon: this.markerIcon }).addTo(map);
  }

  getPosition(): Observable<{ latitude: number; longitude: number }> {
    return new Observable<GeolocationPosition>((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    }).pipe(
      map((position: GeolocationPosition) => {
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      })
    );
  }
}
