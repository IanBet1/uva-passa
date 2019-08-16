import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'up-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit{
    
    @Input() fotoDescription = '';
    @Input() fotoUrl = '';

    ngOnInit(): void {
        if(this.fotoUrl.endsWith('null') || this.fotoUrl == ''){
            this.fotoUrl = "./assets/images/noimage.png";
        }
    }
}