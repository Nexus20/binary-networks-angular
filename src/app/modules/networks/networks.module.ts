import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkCreateComponent } from './network-create/network-create.component';
import { NetworksComponent } from './networks/networks.component';
import { NetworkDetailsComponent } from './network-details/network-details.component';
import {RouterModule} from "@angular/router";
import {NgxGraphModule} from "@swimlane/ngx-graph";
import {ColorPickerModule} from "ngx-color-picker";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NetworkCreateComponent,
    NetworksComponent,
    NetworkDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NetworksComponent
      },
      {
        path: 'create',
        component: NetworkCreateComponent
      },
      {
        path: ':id',
        component: NetworkDetailsComponent
      }
    ]),
    NgxGraphModule,
    ColorPickerModule,
    FormsModule
  ]
})
export class NetworksModule { }
