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
    dataSource: any;
    displayedColumns: any;

    constructor() {
        this.createTestTable();
    }

    public createTestTable(): void {
        // Your data array here
        this.dataSource = [
            {name: 'John', age: 25, city: 'New York'},
            {name: 'Alice', age: 30, city: 'San Francisco'},
            {name: 'Hans', age: 35, city: 'Washington'},
            {name: 'Peter', age: 40, city: 'Rio de Janeiro'},
            {name: 'Walter', age: 45, city: 'Berlin'},
            // Add more data as needed
        ];

        this.displayedColumns = ['name', 'age', 'city'];

        console.log(this.dataSource);
        console.log(this.displayedColumns);
    }
}
