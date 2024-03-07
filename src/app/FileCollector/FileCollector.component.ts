import {Component, ComponentRef, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FileCollectorService} from "./FileCollector.service";
import {FileTablePresenterComponent} from "../FileTablePresenter/FileTablePresenter.component";
import {catchError} from "rxjs";
import {NgClass} from "@angular/common";
import {FileInformation} from "../DataTypes/FileInformation";

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

    public GetSelectedFileNames(): string[]{
        let selectedFileNames: string[] = [];
        this.fileInformationTableRef.instance.selection.selected.forEach((row) => {
            row = row as FileInformation;
            selectedFileNames.push(row.filename);
        });
        return selectedFileNames;
    }

    button1Click() {
        console.log("Debug 1")
    }

    button2Click() {
        this.isDownloading = true;
        this.downloadAllFiles();
    }

    button3Click() {
        this.UpdateFileInformationTable();
    }

    button4Click(){
        console.log("Downloading selected files!");
        this.downloadSelectedFiles(this.GetSelectedFileNames());
    }

    downloadSelectedFiles(selectedFileNames: string[]) {
        // This is a simple example of how to download a file from the server.
        this._fileCollectorService.downloadSelectedFiles(selectedFileNames).subscribe({
            next: (data: Blob) => {
                console.log(data);
                var url = window.URL.createObjectURL(data);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = 'Incomming.rar'; // Use a fixed filename or get it from the server response
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
        });
    }

    downloadAllFiles() {

        // This is a simple example of how to download a file from the server.
        this._fileCollectorService.downloadAllFiles().subscribe({
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
