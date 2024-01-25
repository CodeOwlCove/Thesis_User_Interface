import {Component, NgModule} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FileCollectorComponent} from "./FileCollector/FileCollector.component";
import {FileCollectorService} from "./FileCollector/FileCollector.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { MatTableModule } from '@angular/material/table';
import {FileTablePresenterComponent} from "./FileTablePresenter/FileTablePresenter.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FileCollectorComponent, HttpClientModule, MatTableModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [FileCollectorService, FileTablePresenterComponent, HttpClient]
})

export class AppComponent {
    title = 'My_User_Interface';
}
