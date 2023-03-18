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
    iconUrl: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><text x="50%" y="80%" text-anchor="middle" font-size="36px">📍</text></svg>',
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
