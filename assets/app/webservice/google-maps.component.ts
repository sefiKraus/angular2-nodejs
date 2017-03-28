import {Component, OnInit} from "@angular/core";
import {GoogleMapsService} from "./google-maps.service";
@Component({
    selector:'app-google-maps',
    styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
        `],
    templateUrl:'./google-maps.component.html',
})

export class GoogleMapsComponent implements OnInit{

    markers:marker[];
    constructor(private googleMapService:GoogleMapsService){}

    // google maps zoom level
    zoom: number=8;

    // initial center position for the map
    lat: number=31.970485;
    lng: number=34.771972;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: any) {

        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: false
        });
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    ngOnInit()
    {
        this.googleMapService.getMarkers()
            .subscribe((markers)=>
            {
                this.markers=markers;

            })

    }

}
// just an interface for type safety.
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}