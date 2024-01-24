import {Component} from '@angular/core';
import {FileCollectorService} from "./FileCollector.service";

@Component({
    selector: 'FileCollector',
    standalone: true,
    templateUrl: './FileCollector.component.html',
    styleUrl: './FileCollector.component.css'
})

export class FileCollectorComponent {
    title: string = 'FileCollector';
    _fileCollectorService: FileCollectorService;

    constructor(fileCollectorService: FileCollectorService) {
        this._fileCollectorService = fileCollectorService;
        this.title = fileCollectorService.collectFiles();
    }

    button1Click() {
        this._fileCollectorService.getData();
    }

    button2Click() {
        this.downloadFile();
    }

    button3Click() {
        alert("button3Click");
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
