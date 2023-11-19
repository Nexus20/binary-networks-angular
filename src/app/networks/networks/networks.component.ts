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
import {BinaryNetworkShortResult, SaveBinaryNetworkRequest} from "../../models/binaryNetwork";
import {HeaderComponent} from "../../shared/header/header.component";
import {NetworkCreateDialogComponent} from "../network-create-dialog/network-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NetworksService} from "../services/networks.service";
import {ImportNetworkDialogComponent} from "../import-network-dialog/import-network-dialog.component";

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

    public constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog, private networkService: NetworksService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({networks}) => {
            this.networks = networks;
        });
    }

    OpenCreateNewNetworkDialog() {

        const dialogRef = this.dialog.open(NetworkCreateDialogComponent, {
            width: '500px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result);

                const request : SaveBinaryNetworkRequest = {
                    id: null,
                    network: {
                        nodes: [
                            {
                                id: 1,
                                label: result.firstNodeName,
                                position: null
                            }
                        ],
                        edges: null
                    },
                    networkName: result.networkName,
                    previewImageBase64: null
                }

                this.networkService.saveNetwork(request).subscribe(() => {
                    this.networkService.getNetworks().subscribe((networks) => {
                        this.networks = networks;
                    });
                });
            }
        });
    }

    OpenImportNetworkDialog() {

        const dialogRef = this.dialog.open(ImportNetworkDialogComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);

            if(result) {
                const formData = new FormData();
                formData.append('file', result, result.name);

                this.networkService.importNetwork(formData).subscribe({
                    next: () => {
                        this.networkService.getNetworks().subscribe((networks) => {
                            this.networks = networks;
                        });
                    },
                    error: (error) => {
                        console.error(error);
                    }
                });
            }
        });
    }
}
