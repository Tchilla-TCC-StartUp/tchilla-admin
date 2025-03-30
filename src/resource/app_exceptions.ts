export enum ApiErrorType {
    NETWORK = "NETWORK_ERROR",
    TIMEOUT = "TIMEOUT_ERROR",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    VALIDATION = "VALIDATION_ERROR",
    SERVER = "SERVER_ERROR",
    UNKNOWN = "UNKNOWN_ERROR",
}

export class ApiException extends Error {
    public status: number;
    public type: ApiErrorType;
    public details?: Record<string, unknown>;

    constructor(message: string, status: number, type: ApiErrorType, details?: Record<string, unknown>) {
        super(message);
        this.name = "ApiException";
        this.status = status;
        this.type = type;
        this.details = details;
    }
}
