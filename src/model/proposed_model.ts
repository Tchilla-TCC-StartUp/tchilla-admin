
export enum ProposedStatus {
    CANCELLED = 'cancelled',
    SUCCESS = 'success',
    PENDING = 'pending',
}

export enum ProposedType {
    LOCAL = 'local',
    SERVICE = 'service',
    COMBO = 'combo',
}

export interface ServiceModel {
    name: string;
    description: string;
}

export interface ProposedModel {
    id: string;
    image: string;
    name: string;
    location: string;
    supportPersonNumber: number;
    status?: ProposedStatus;
    type: ProposedType;
    typeEvent: string;
    price: number;
    services: ServiceModel[];
    date: string;
}
