import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EditObjectComponent } from './edit-object/edit-object.component';
import { ListObjectsComponent } from './list-objects/list-objects.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,

    EditObjectComponent,
    ListObjectsComponent,
    
    HttpClientModule,
    
    RouterLink, 
    RouterOutlet, 
    RouterLinkActive,
    
    ToastModule,

    CommonModule,
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
