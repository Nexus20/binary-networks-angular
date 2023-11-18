import {Route} from "@angular/router";
import {NetworksComponent} from "./networks/networks.component";
import {binaryNetworkResolver, binaryNetworksResolver} from "./resolvers/binary-networks.resolver";
import {NetworkDetailsComponent} from "./network-details/network-details.component";

export default [
    {
        path: '', component: NetworksComponent, resolve: {networks: binaryNetworksResolver}
    },
    {
        path: ':id', component: NetworkDetailsComponent, resolve: {network: binaryNetworkResolver}
    }
] satisfies Route[];
