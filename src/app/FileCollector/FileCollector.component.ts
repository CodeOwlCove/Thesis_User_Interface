import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FileCollectorService} from "./FileCollector.service";
import {FileTablePresenterComponent} from "../FileTablePresenter/FileTablePresenter.component";
import {catchError} from "rxjs";

@Component({
    selector: 'FileCollector',
    standalone: true,
    templateUrl: './FileCollector.component.html',
    styleUrl: './FileCollector.component.css'
})

export class FileCollectorComponent {
    title: string = 'FileCollector';
    _fileCollectorService: FileCollectorService;
    _fileTablePresenterComponent: FileTablePresenterComponent;

    @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
    fileInformationTableRef!: ComponentRef<FileTablePresenterComponent>

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
        this.downloadFile();
    }

    button3Click() {
        this.UpdateFileInformationTable();
    }

    downloadFile() {

        //calling service
        this._fileCollectorService.downloadFile().subscribe(response => {

            console.log(response);
            var binaryData = [];
            binaryData.push(response.data);
            var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/rar"}));
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.setAttribute('target', 'blank');
            a.href = url;
            a.download = response.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

        }, error => {

            console.log(error);
        });
    }
}
