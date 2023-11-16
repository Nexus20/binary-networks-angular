import {Component, OnDestroy, OnInit} from '@angular/core';
import {Node, Edge, Data, Options} from "vis-network";
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
import {CommonModule} from '@angular/common';
import {VisModule, VisNetworkService} from "ngx-vis";

@Component({
  selector: 'app-networks',
  standalone: true,
  imports: [CommonModule, VisModule],
  templateUrl: './networks.component.html',
  styleUrl: './networks.component.scss'
})
export class NetworksComponent implements OnInit, OnDestroy {
  public visNetwork: string = 'networkId1';
  public visNetworkData!: Data;
  public nodes!: DataSet<Node>;
  public edges!: DataSet<Edge>;
  public visNetworkOptions!: Options;

  public constructor(private visNetworkService: VisNetworkService) {
  }

  public addNode(): void {
    const lastId = this.nodes.length;
    const newId = this.nodes.length + 1;
    this.nodes.add({id: newId, label: 'New Node'});
    this.edges.add({from: lastId, to: newId});
    this.visNetworkService.fit(this.visNetwork);
  }

  public networkInitialized(): void {
    // now we can use the service to register on events
    this.visNetworkService.on(this.visNetwork, 'click');

    // open your console/dev tools to see the click params
    this.visNetworkService.click.subscribe((eventData: any[]) => {
      if (eventData[0] === this.visNetwork) {
        // tslint:disable: no-console
        console.log(eventData[1]);
      }
    });
  }

  public ngOnInit(): void {
    this.nodes = new DataSet<Node>([
      {id: '1', label: 'Node 1'},
      {id: '2', label: 'Node 2'},
      {id: '3', label: 'Node 3'},
      {id: '4', label: 'Node 4'},
      {id: '5', label: 'Node 5', title: 'Title of Node 5'},
    ]);
    this.edges = new DataSet<Edge>([
      {from: '1', to: '2'},
      {from: '1', to: '3'},
      {from: '2', to: '4'},
      {from: '2', to: '5'},
    ]);
    this.visNetworkData = {nodes: this.nodes, edges: this.edges};

    this.visNetworkOptions = {
      physics: {
        enabled: false,
      }
    };
  }

  public ngOnDestroy(): void {
    this.visNetworkService.off(this.visNetwork, 'click');
  }
}
