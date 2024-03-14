import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-list-objects',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  templateUrl: './list-objects.component.html',
  styleUrl: './list-objects.component.scss'
})
export class ListObjectsComponent {
  objects: any[] = [];
  loading: boolean = true;
  originalObjects: any[] = [];
  search = new FormControl('');

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private messageService: MessageService, private router: Router) {
    this.search.valueChanges.subscribe(value => {
      this.objects = this.originalObjects.filter(object => 
        object.name.toLowerCase().includes(value?.toLowerCase()) ||
         object.description.toLowerCase().includes(value?.toLowerCase()))
    });

    // search for url params and display messages accordingly
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params?.['deleted'] === 'true') {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Record has been deleted!'});
        this.router.navigate([], { queryParams: { deleted: null }, queryParamsHandling: 'merge' });
      }

      if (params?.['created'] === 'true') {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Record has been created!'});
        this.router.navigate([], { queryParams: { created: null }, queryParamsHandling: 'merge' });
      }
    });
  }

  ngOnInit() {
    this.http.get('http://localhost:5000/objects').subscribe(data => {
      this.objects = (data as any).objects ?? [];
      this.originalObjects = this.objects;

      // simulate loading
      setTimeout(() => this.loading = false, 800);
    });


  }
}
