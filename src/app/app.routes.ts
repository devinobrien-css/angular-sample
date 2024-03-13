import { Routes } from '@angular/router';
import { EditObjectComponent } from './edit-object/edit-object.component';
import { CreateObjectComponent } from './create-object/create-object.component';
import { ListObjectsComponent } from './list-objects/list-objects.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'objects', component: ListObjectsComponent },
    { path: 'objects/create', component: CreateObjectComponent },
    { path: 'objects/:id/edit', component: EditObjectComponent },
    { path: '', component: HomeComponent },
];
