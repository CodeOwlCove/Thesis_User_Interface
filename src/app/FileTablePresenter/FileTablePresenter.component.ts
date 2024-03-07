import { Component } from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import {FileInformation} from "../DataTypes/FileInformation";
import {Observable} from "rxjs";
import {MatCheckbox} from "@angular/material/checkbox";
import { SelectionModel } from '@angular/cdk/collections';
import {MatIcon} from "@angular/material/icon";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'file-table',
    templateUrl: './FileTablePresenter.component.html',
    styleUrls: ['./FileTablePresenter.component.css'],
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderRowDef,
        MatRowDef,
        MatHeaderCell,
        MatHeaderRow,
        MatRow,
        MatCellDef,
        MatHeaderCellDef,
        MatCell,
        MatCheckbox,
        MatIcon,
    ],
    standalone: true
})

export class FileTablePresenterComponent {

    dataSource: FileInformation[];
    displayedColumns: any;

    // Selection model to keep track of the selected rows
    selection = new SelectionModel<any>(true, []);

    constructor(private http: HttpClient) {
        this.dataSource = [];
        this.displayedColumns = [];
    }

    public updateTable(fileInformation: FileInformation[]): void {
        console.log(fileInformation);
        if(fileInformation == null || fileInformation.length <= 0)
        {
            console.log("No data received!")
            return;
        }

        let newDataSource: FileInformation[] = [];

        fileInformation.forEach((item: FileInformation) => {
            item.filesize = this.bytesToSuffix(item.filesize);
            newDataSource.push(item);
        });

        this.dataSource = newDataSource;

        this.displayedColumns = ['select', 'filename', 'filetype', 'filesize', "contractDownload"];
    }

    private bytesToSuffix(fileSizeAsString: string): string {

        let splitString = fileSizeAsString.split(".");

        const sizeUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        let prefix = splitString[0];
        let prefix2 = splitString[1];
        let suffix = sizeUnits[splitString.length - 1];

        console.log(splitString)

        return `${prefix}.${prefix2} ${suffix}`
    }

    // Check if all rows are selected
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.length;
        return numSelected === numRows;
    }

    // Select/deselect all rows
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.forEach(row => this.selection.select(row));
    }

    getSelectedRows() {
        return this.selection.selected;
    }

    sendDataToBackend(rowData: any){
        console.log("Request Contract of File: " + rowData.filename);
        this.downloadContract(rowData.filename);
    }

    downloadSelectedFiles(selectedFileNames: string) {
        console.log("Request Files: " + selectedFileNames);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(
            'http://localhost:12080/GetContract',
            { selectedFiles: selectedFileNames },
            { headers: headers, responseType: 'blob' }
        );
    }

    downloadContract(fileName: string) {
        // This is a simple example of how to download a file from the server.
        this.downloadSelectedFiles(fileName).subscribe({
            next: (data: Blob) => {
                console.log(data);
                var url = window.URL.createObjectURL(data);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = 'Contract.rar'; // Use a fixed filename or get it from the server response
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            },
            error: (error) => {
                console.log("Error: " + error);
            }
        });
    }
}
