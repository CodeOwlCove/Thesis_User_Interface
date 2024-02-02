import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";
import {FileInformation} from "../DataTypes/FileInformation";

@Injectable({providedIn: 'root'})
export class FileCollectorService {

    constructor(private http: HttpClient) { }

    collectFiles(): string {
        return "test";
    }

    getFileInformation(): Observable<FileInformation[]> {
        let fileInformationList: FileInformation[] = [];

        return this.http.get('http://localhost:12080/GetFileInformation').pipe(
            map((data: any) => {
                const jsonResponse = JSON.parse(JSON.stringify(data));

                jsonResponse.forEach((item: any) => {
                    fileInformationList.push(new FileInformation(item.filename, item.filetype, item.filesize as string));
                });

                return fileInformationList;
            }), catchError((error: any) => {
                alert("Connection Error!");

                return throwError(() => new Error('Could not retrieve file information from server!'));
            })
        );
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
