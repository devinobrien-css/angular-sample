import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { RootComponent } from './root/root.component';
import { ListObjectsComponent } from './list-objects/list-objects.component';
import { CreateObjectComponent } from './create-object/create-object.component';
import { EditObjectComponent } from './edit-object/edit-object.component';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    ToastModule,
    
    HttpClientModule,
    
    RouterLink, 
    RouterOutlet, 
    RouterLinkActive,
    
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'objects', component: ListObjectsComponent },
      { path: 'objects/create', component: CreateObjectComponent },
      { path: 'objects/:id/edit', component: EditObjectComponent },
    ]),
  ],
  declarations: [ RootComponent ],
  bootstrap: [ RootComponent ],
  providers: [ MessageService ]
})
export class AppComponent {}
