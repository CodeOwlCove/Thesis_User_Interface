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
    ],
    standalone: true
})

export class FileTablePresenterComponent {
    dataSource: FileInformation[];
    displayedColumns: any;
    constructor() {
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

        this.displayedColumns = ['filename', 'filetype', 'filesize'];
    }

    private bytesToSuffix(fileSizeAsString: string): string {

        let splitString = fileSizeAsString.split(".");

        const sizeUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        let prefix = splitString[0];
        let prefix2 = splitString[1];
        let suffix = sizeUnits[splitString.length - 1];

        console.log(splitString)

        return `${prefix}.${prefix2} ${suffix}`};
}
