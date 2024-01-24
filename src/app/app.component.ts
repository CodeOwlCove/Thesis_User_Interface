import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FileCollectorComponent} from "./FileCollector/FileCollector.component";
import {FileCollectorService} from "./FileCollector/FileCollector.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FileCollectorComponent, HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [FileCollectorService, HttpClient]
})
export class AppComponent {
    title = 'My_User_Interface';
}
