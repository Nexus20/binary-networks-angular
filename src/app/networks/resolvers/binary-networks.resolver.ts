import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {BinaryNetworkResult, BinaryNetworkShortResult} from "../../models/binaryNetwork";
import {inject} from "@angular/core";
import {NetworksService} from "../services/networks.service";

export const binaryNetworksResolver : ResolveFn<BinaryNetworkShortResult[]> = () => {
    return inject(NetworksService).getNetworks();
}

export const binaryNetworkResolver : ResolveFn<BinaryNetworkResult> = (route: ActivatedRouteSnapshot) => {
    return inject(NetworksService).getNetworkById(route.paramMap.get('id')!);
}
