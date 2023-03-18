import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentPosition: { latitude: number | undefined, longitude: number | undefined } = { latitude: undefined, longitude: undefined };

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.position$.subscribe((position) => {
      this.currentPosition = position;
    });
  }
}
