
export interface SaveBinaryNetworkRequest {
    id: string | null;
    networkName: string;
    previewImageBase64: string | null;
    network: BinaryNetwork;
}

export interface BaseResult {
    id: string;
    createdAt: Date;
    updatedAt?: Date | null;
}

export interface BinaryNetworkShortResult extends BaseResult {
    networkName: string;
    previewImageUrl: string | null;
}

export interface BinaryNetworkResult extends BinaryNetworkShortResult {
    network: BinaryNetwork;
}

export interface BinaryNetwork {
    nodes: BinaryNetworkNode[];
    edges: BinaryNetworkEdge[];
}

export interface BinaryNetworkNode {
    id: number;
    label: string;
    position: BinaryNetworkNodePosition;
}

export interface BinaryNetworkNodePosition {
    x: number;
    y: number;
}

export interface BinaryNetworkEdge {
    from: number;
    to: number;
}
