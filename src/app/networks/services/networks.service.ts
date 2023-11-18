import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BinaryNetworkResult, BinaryNetworkShortResult, SaveBinaryNetworkRequest} from "../../models/binaryNetwork";

@Injectable({
    providedIn: 'root'
})
export class NetworksService {

    private readonly api = 'https://localhost:7229/';

    constructor(private httpClient: HttpClient) {
    }

    public getNetworks() {
        return this.httpClient.get<BinaryNetworkShortResult[]>(`${this.api}BinaryNetworks`);
    }

    public saveNetwork(payload: SaveBinaryNetworkRequest) {
        return this.httpClient.post(`${this.api}BinaryNetworks/save`, payload);
    }

    public getNetworkById(id: string) {
        return this.httpClient.get<BinaryNetworkResult>(`${this.api}BinaryNetworks/${id}`);
    }
}
