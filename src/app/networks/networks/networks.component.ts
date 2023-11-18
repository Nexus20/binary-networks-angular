import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisModule} from "ngx-vis";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {CdkContextMenuTrigger, CdkMenu, CdkMenuItem} from "@angular/cdk/menu";
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {network} from "vis-network";
import {BinaryNetworkShortResult} from "../../models/binaryNetwork";
import {HeaderComponent} from "../../shared/header/header.component";

export enum NetworkModes {
    Default = 0,
    EditNodes = 1,
    EditEdges = 2
}

@Component({
    selector: 'app-networks',
    standalone: true,
    imports: [
        CommonModule,
        VisModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatMenuModule,
        CdkContextMenuTrigger,
        CdkMenu,
        CdkMenuItem,
        MatListModule,
        HttpClientModule,
        HeaderComponent,
        RouterLink
    ],
    templateUrl: './networks.component.html',
    styleUrl: './networks.component.scss'
})
export class NetworksComponent implements OnInit {

    public networks: BinaryNetworkShortResult[] = [];

    public constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({networks}) => {
            this.networks = networks;
        });
    }
}
