import {Component, ComponentRef, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FileCollectorService} from "./FileCollector.service";
import {FileTablePresenterComponent} from "../FileTablePresenter/FileTablePresenter.component";
import {catchError} from "rxjs";
import {NgClass} from "@angular/common";

@Component({
    selector: 'FileCollector',
    standalone: true,
    templateUrl: './FileCollector.component.html',
    imports: [
        NgClass
    ],
    styleUrl: './FileCollector.component.css'
})

export class FileCollectorComponent {
    title: string = 'FileCollector';
    _fileCollectorService: FileCollectorService;
    _fileTablePresenterComponent: FileTablePresenterComponent;

    @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
    fileInformationTableRef!: ComponentRef<FileTablePresenterComponent>

    // Add a boolean property to track download operation status
    isDownloading: boolean = false;

    constructor(fileCollectorService: FileCollectorService, FileTablePresenterComponent: FileTablePresenterComponent) {
        this._fileCollectorService = fileCollectorService;
        this._fileTablePresenterComponent = FileTablePresenterComponent;
        this.title = fileCollectorService.collectFiles();
    }

    AddFileInformationTable(){
        this.fileInformationTableRef = this.vcr.createComponent(FileTablePresenterComponent);
    }

    UpdateFileInformationTable() {
        if(this.fileInformationTableRef == null)
            this.AddFileInformationTable();

        this._fileCollectorService.getFileInformation().subscribe({
           next: (data) => {
               this.fileInformationTableRef.instance.updateTable(data);
               },
           error: (error) => {
               new Error('Could not retrieve file information from server!');
               },
           complete: () => {
               console.log("UpdateFileInformationTable complete!");
           }
        });
    }

    button1Click() {
        console.log("Debug 1")
    }

    button2Click() {
        this.isDownloading = true;
        this.downloadFile();
    }

    button3Click() {
        this.UpdateFileInformationTable();
    }

    downloadFile() {

        // This is a simple example of how to download a file from the server.
        this._fileCollectorService.downloadFile().subscribe({
            next: (data) => {
                console.log(data);
                var binaryData = [];
                binaryData.push(data.data);
                var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/rar"}));
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.setAttribute('target', 'blank');
                a.href = url;
                a.download = data.filename;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            },
            error: (error) => {
                console.log("Error: " + error);
            },
            complete: () => {
                console.log("Download complete!");
                this.isDownloading = false;
            }
        })
    }
}
