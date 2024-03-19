import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";
import {FileInformation} from "../DataTypes/FileInformation";

@Injectable({providedIn: 'root'})
export class FileCollectorService {

    constructor(private http: HttpClient) { }



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

    downloadAllFiles(): Observable<any> {
        return this.http.get("http://localhost:12080/GetAllFilesFrontend", { responseType: 'blob' }).pipe(map((response)=>{
            return {
                filename: 'Incomming.rar',
                data: response
            };
        }));
    }

    downloadSelectedFiles(selectedFileNames: string[]) {
        console.log("Request Files: " + selectedFileNames);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(
            'http://localhost:12080/GetSelectedFilesFrontend',
            { selectedFiles: selectedFileNames },
            { headers: headers, responseType: 'blob' }
        );
    }
}
