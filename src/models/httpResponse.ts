export class HttpResponse<T> {
    code:string;
    success:boolean;
    message:string;
    response:T
}