import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

    public exportNetworkAsJson(payload: SaveBinaryNetworkRequest) {
        return this.httpClient.post<Blob>(`${this.api}BinaryNetworks/export`, payload, {
            headers: new HttpHeaders({ 'Accept': 'application/json' }),
            responseType: 'blob' as 'json'
        });
    }

    public importNetwork(formData: FormData) {
        return this.httpClient.post(`${this.api}BinaryNetworks/import`, formData);
    }
}
