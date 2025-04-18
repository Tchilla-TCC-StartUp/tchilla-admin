export default interface ResponseInterface {
    isSuccess: boolean;
    message: string;
    errorMessage: string;
    data: any;
}