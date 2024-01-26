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
        this.dataSource = [
            {name: 'John', age: 25, city: 'New York'},
            {name: 'Alice', age: 30, city: 'San Francisco'},
            {name: 'Hans', age: 35, city: 'Washington'},
            {name: 'Peter', age: 40, city: 'Rio de Janeiro'},
            {name: 'Walter', age: 45, city: 'Berlin'},
            // Add more data as needed
        ];

        this.displayedColumns = ['name', 'age', 'city'];
    }

    public updateTable(): void {
        this.dataSource = [
            {name: 'John2', age: 225, city: '2 New York'},
            {name: 'Alice2', age: 230, city: '2 San Francisco'},
            {name: 'Hans2', age: 235, city: '2 Washington'},
            {name: 'Peter2', age: 240, city: '2 Rio de Janeiro'},
            {name: 'Walter2', age: 245, city: '2 Berlin'},
            // Add more data as needed
        ];
    }
}
