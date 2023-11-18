import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {Data, Edge, Node, Options} from "vis-network";
import {DataSet} from "vis-data/peer/esm/vis-data";
import {VisModule, VisNetworkService} from "ngx-vis";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NetworksService} from "../services/networks.service";
import {CreateNodeDialogComponent} from "../components/create-node-dialog/create-node-dialog.component";
import {EditNodeDialogComponent} from "../components/edit-node-dialog/edit-node-dialog.component";
import {DeleteNodeDialogComponent} from "../components/delete-node-dialog/delete-node-dialog.component";
import {DeleteEdgeDialogComponent} from "../components/delete-edge-dialog/delete-edge-dialog.component";
import {BinaryNetworkNode, SaveBinaryNetworkRequest} from "../../models/binaryNetwork";
import {NetworkModes} from "../networks/networks.component";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {CdkContextMenuTrigger, CdkMenu, CdkMenuItem} from "@angular/cdk/menu";
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "../../shared/header/header.component";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-network-details',
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
        HeaderComponent
    ],
    templateUrl: './network-details.component.html',
    styleUrl: './network-details.component.scss'
})
export class NetworkDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
    public visNetworkName: string = 'networkId1';
    public visNetworkData!: Data;
    public nodes!: DataSet<Node>;
    public edges!: DataSet<Edge>;
    public visNetworkOptions!: Options;

    public contextMenuVisible = false;
    public contextMenuPosition = {x: '0px', y: '0px'};

    public selectedNodeId: number | null = null;

    public currentNetworkMode: NetworkModes = NetworkModes.Default;
    public newNodeLabel: string = '';

    public firstNode: Node | null = null;
    public secondNode: Node | null = null;

    public selectedEdge: Edge | null = null;
    public screenshotUrl: string | null = null;

    @ViewChild('visNetworkCanvas') visNetworkCanvas!: ElementRef<HTMLElement>;
    @ViewChild('screenshot') screenshot!: ElementRef<HTMLElement>;

    public constructor(private visNetworkService: VisNetworkService, public dialog: MatDialog, private snackBar: MatSnackBar, private networksService: NetworksService, private activatedRoute: ActivatedRoute) {
    }

    public addNode(): void {

        if (this.currentNetworkMode !== NetworkModes.EditNodes)
            return;

        if (this.selectedNodeId == null) {
            alert('Please select a node to connect with the new node.');
            return;
        } else {
            const newId = this.nodes.length + 1; // ID для нового узла
            this.nodes.add({id: newId, label: this.newNodeLabel});
            this.edges.add({from: this.selectedNodeId, to: newId}); // Создаем ребро от выбранного узла к новому
            this.visNetworkService.fit(this.visNetworkName);

            this.selectedNodeId = null; // Сброс выбранного узла после добавления
            this.visNetworkService.unselectAll(this.visNetworkName);
            this.newNodeLabel = '';
        }
    }

    addEdge() {

        if (!this.firstNode || !this.secondNode)
            return;

        const firstNodeId = this.firstNode.id;
        const secondNodeId = this.secondNode.id;

        const existingEdge = this.edges.get({
            filter: function (edge: Edge) {
                return (edge.from === firstNodeId && edge.to === secondNodeId) ||
                    (edge.from === secondNodeId && edge.to === firstNodeId);
            }
        });

        if (existingEdge.length) {
            this.snackBar.open('Such edge already exists', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
            });
        } else {
            this.edges.add({
                from: this.firstNode.id,
                to: this.secondNode.id
            });
        }

        this.firstNode = null;
        this.secondNode = null;

        this.selectedNodeId = null;
        this.visNetworkService.unselectAll(this.visNetworkName);
    }

    public networkInitialized(): void {
        // now we can use the service to register on events
        this.visNetworkService.on(this.visNetworkName, 'click',);
        this.visNetworkService.on(this.visNetworkName, 'selectNode');
        this.visNetworkService.on(this.visNetworkName, 'deselectNode');
        this.visNetworkService.on(this.visNetworkName, 'zoom');
        this.visNetworkService.on(this.visNetworkName, 'selectEdge');
        this.visNetworkService.on(this.visNetworkName, 'deselectEdge');


        this.visNetworkService.zoom.subscribe((eventData: any[]) => {
            console.log(eventData);
            this.contextMenuVisible = false;
            this.visNetworkService.unselectAll(this.visNetworkName);
            this.selectedNodeId = null;
        });

        this.visNetworkService.selectEdge.subscribe((eventData: any[]) => {
            if (eventData[0] === this.visNetworkName) {
                console.log('select edge', eventData[1]);

                if (this.currentNetworkMode === NetworkModes.EditEdges) {
                    const edgeId = eventData[1].edges[0]; // Предполагаем, что выделена одна грань
                    this.selectedEdge = this.edges.get(edgeId);
                }
            }
        });

        this.visNetworkService.deselectEdge.subscribe((eventData: any[]) => {
            if (eventData[0] === this.visNetworkName) {
                console.log(eventData[1]);

                this.selectedEdge = null;
            }
        });

        // this.visNetworkService.on(this.visNetwork, 'oncontext', true);

        // this.visNetworkService.oncontext.subscribe((eventData: any[]) => {
        //     if (eventData[0] === this.visNetwork) {
        //
        //     }
        // });

        // // open your console/dev tools to see the click params
        // this.visNetworkService.click.subscribe((eventData: any[]) => {
        //     if (eventData[0] === this.visNetwork) {
        //         // tslint:disable: no-console
        //         console.log(eventData[1]);
        //     }
        // });

        this.visNetworkService.selectNode.subscribe((eventData: any[]) => {

            if (eventData[0] === this.visNetworkName) {
                console.log('selectNode', eventData[1]);

                this.selectedEdge = null;

                if (this.currentNetworkMode === NetworkModes.EditNodes) {

                    if (eventData[1].nodes.length === 1) {
                        this.contextMenuVisible = true;
                        this.contextMenuPosition.x = eventData[1].pointer.DOM.x + 'px';
                        this.contextMenuPosition.y = eventData[1].pointer.DOM.y + 'px';
                        this.selectedNodeId = eventData[1].nodes[0]; // Сохраняем выбранный узел
                    }
                } else if (this.currentNetworkMode === NetworkModes.EditEdges) {

                    if (eventData[1].nodes.length === 1) {
                        const selectedNodeId = eventData[1].nodes[0] as number;
                        const selectedNode = this.nodes.get(selectedNodeId);

                        if (!selectedNode)
                            return;

                        if (this.firstNode && this.secondNode) {
                            this.firstNode = null;
                            this.secondNode = null;
                        }

                        if (!this.firstNode) {
                            this.firstNode = selectedNode;
                        } else if (!this.secondNode) {
                            this.secondNode = selectedNode;
                        }
                    }
                }
            }
        });

        this.visNetworkService.deselectNode.subscribe((eventData: any) => {

            if (eventData[0] === this.visNetworkName) {
                this.selectedNodeId = null; // Сброс выбранного узла

                if (this.currentNetworkMode === NetworkModes.EditNodes) {
                    this.contextMenuVisible = false;
                } else if (this.currentNetworkMode === NetworkModes.EditEdges) {

                    if (this.firstNode && this.secondNode) {
                        this.firstNode = null;
                        this.secondNode = null;
                    }
                }
            }
        });
    }

    public ngAfterViewInit() {

    }

    public ngOnInit(): void {

        this.nodes = new DataSet<Node>([
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'},
        ]);
        this.edges = new DataSet<Edge>([
            {from: 1, to: 2},
            {from: 1, to: 3},
            {from: 2, to: 4},
            {from: 2, to: 5},
        ]);
        this.visNetworkData = {nodes: this.nodes, edges: this.edges};

        this.visNetworkOptions = {
            physics: {
                enabled: false,
            },
            interaction: {
                selectable: true,
                selectConnectedEdges: false,
            },
            edges: {
                physics: false,
                smooth: false
            }
        };
    }

    public ngOnDestroy(): void {
        this.visNetworkService.off(this.visNetworkName, 'click');
    }

    toggleEditNodesMode() {
        this.currentNetworkMode = this.currentNetworkMode === NetworkModes.EditNodes ? NetworkModes.Default : NetworkModes.EditNodes;
        console.log('toggleEditNodesMode', this.currentNetworkMode.toString());

        if (this.currentNetworkMode === NetworkModes.Default) {
            this.visNetworkService.unselectAll(this.visNetworkName);
            this.selectedNodeId = null;
            this.contextMenuVisible = false;
        }
    }

    toggleEditEdgesMode() {

        this.currentNetworkMode = this.currentNetworkMode === NetworkModes.EditEdges ? NetworkModes.Default : NetworkModes.EditEdges;
        console.log('toggleEditNodesEdges', this.currentNetworkMode.toString());

        if (this.currentNetworkMode === NetworkModes.Default) {
            this.visNetworkService.unselectAll(this.visNetworkName);
            this.selectedNodeId = null;
            this.contextMenuVisible = false;
        }
    }

    openCreateNodeDialog(): void {

        if (!this.selectedNodeId)
            return;

        const node = this.nodes.get(this.selectedNodeId);

        if (!node)
            return;

        const dialogRef = this.dialog.open(CreateNodeDialogComponent, {
            width: '250px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                const newId = this.nodes.length + 1; // ID для нового узла
                this.nodes.add({id: newId, label: result.label});
                this.edges.add({from: this.selectedNodeId!, to: newId}); // Создаем ребро от выбранного узла к новому
                this.visNetworkService.fit(this.visNetworkName);
            }

            this.contextMenuVisible = false;
            this.visNetworkService.unselectAll(this.visNetworkName);
            this.selectedNodeId = null;
        });
    }

    openEditNodeDialog(): void {

        if (!this.selectedNodeId)
            return;

        const node = this.nodes.get(this.selectedNodeId);

        if (!node)
            return;

        const dialogRef = this.dialog.open(EditNodeDialogComponent, {
            width: '250px',
            data: {label: node.label}
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                this.nodes.update({id: this.selectedNodeId!, label: result.label});
            }

            this.contextMenuVisible = false;
            this.visNetworkService.unselectAll(this.visNetworkName);
            this.selectedNodeId = null;
        });
    }

    openDeleteNodeDialog(): void {
        const dialogRef = this.dialog.open(DeleteNodeDialogComponent, {
            width: '250px',
            data: { /* данные для диалога, если нужны */}
        });

        dialogRef.afterClosed().subscribe(result => {

            console.log(result)

            if (result && this.selectedNodeId) {
                this.deleteNode(this.selectedNodeId);
            }

            this.contextMenuVisible = false;
            this.visNetworkService.unselectAll(this.visNetworkName);
            this.selectedNodeId = null;
        });
    }

    deleteNode(nodeId: number): void {
        // Удалить все рёбра, связанные с удаляемым узлом
        const connectedEdges = this.edges.get({
            filter: function (edge) {
                return edge.from === nodeId || edge.to === nodeId;
            }
        });

        this.edges.remove(connectedEdges.map(edge => edge.id));

        // Удалить сам узел
        this.nodes.remove(nodeId);

        this.visNetworkService.fit(this.visNetworkName);
    }

    openDeleteEdgeDialog() {

        const dialogRef = this.dialog.open(DeleteEdgeDialogComponent, {
            width: '250px',
            data: { /* данные для диалога, если нужны */}
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result && this.selectedEdge) {
                this.deleteEdge();
            }
        });
    }

    deleteEdge() {

        if (!this.selectedEdge)
            return;

        this.edges.remove(this.selectedEdge.id!);
        this.selectedEdge = null;
    }

    public SaveNetwork(): void {

        if (!this.visNetworkCanvas)
            return;

        const canvas = this.visNetworkCanvas.nativeElement.getElementsByTagName('canvas')[0];
        const imageBase64 = canvas.toDataURL('image/png');
        console.log(imageBase64);

        const request: SaveBinaryNetworkRequest = {
            id: null,
            network: {
                nodes: this.nodes.map(node => {

                    const position = this.visNetworkService.getPositions(this.visNetworkName, [node.id!]);

                    const result: BinaryNetworkNode = {
                        id: node.id as number, label: node.label!, position: {
                            x: position[node.id!].x,
                            y: position[node.id!].y
                        }
                    };

                    return result;
                }),
                edges: this.edges.map(edge => {
                    return {from: edge.from as number, to: edge.to as number};
                }),
            },
            networkName: this.visNetworkName,
            previewImageBase64: imageBase64
        };

        console.log(request);

        this.networksService.saveNetwork(request).subscribe(result => {
            console.log(result);
        });
    }
}
