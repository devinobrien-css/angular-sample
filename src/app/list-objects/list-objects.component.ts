import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-objects',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './list-objects.component.html',
  styleUrl: './list-objects.component.scss'
})
export class ListObjectsComponent {
  objects: any[] = [];
  loading: boolean = true;
  originalObjects: any[] = [];
  search = new FormControl('');

  constructor(private http: HttpClient) {
    this.search.valueChanges.subscribe(value => {
      this.objects = this.originalObjects.filter(object => 
        object.name.toLowerCase().includes(value?.toLowerCase()) ||
         object.description.toLowerCase().includes(value?.toLowerCase()))
    });
  }

  ngOnInit() {
    this.http.get('http://localhost:5000/objects').subscribe(data => {
      this.objects = (data as any).objects ?? [];
      this.originalObjects = this.objects;

      // simulate loading
      setTimeout(() => this.loading = false, 1000);
    });
  }
}
