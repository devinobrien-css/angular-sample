import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-objects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-objects.component.html',
  styleUrl: './list-objects.component.scss'
})
export class ListObjectsComponent {
  objects: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/objects').subscribe(data => {
      console.log(data);
      this.objects = (data as any).objects ?? [];
    });
  }
}
