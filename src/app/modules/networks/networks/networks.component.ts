import { Component } from '@angular/core';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent {
  public links = [
    { id: 'a', source: 'first', target: 'second', label: 'is parent of' },
    { id: 'b', source: 'first', target: 'third', label: 'custom label' }
  ];
  public nodes = [
    { id: 'first', label: 'Node 1', color: 'red' },
    { id: 'second', label: 'Node 2', color: 'green' },
    { id: 'third', label: 'Node 3', color: 'blue' }
  ];

  nodeName: string = '';
  nodeColor: string = '#0000ff'; // Default color

  public getStyles(node: Node): any {
    return {
      // 'background-color': node.data.backgroundColor
      'background-color': 'red'
    };
  }

  public addNode() {
    this.nodes.push({ id: this.nodeName, label: this.nodeName, color: this.nodeColor });
    // Reset form
    this.nodeName = '';
    this.nodeColor = '#0000ff';
  }
}
