import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class FileCollectorService {

    constructor(private http: HttpClient) { }

    collectFiles(): string {
        return "test";
    }

    getData() {
        this.http.get('http://localhost:12080/ping').subscribe((data) => {
           alert(JSON.parse(JSON.stringify(data))["message"]);
        });
    }

    downloadFile(): Observable<any> {
        return this.http.get("http://localhost:12080/GetFilesFrontend", { responseType: 'blob' }).pipe(map((response)=>{
            return {
                filename: 'Incomming.rar',
                data: response
            };
        }));
    }
}
