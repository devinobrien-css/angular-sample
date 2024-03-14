import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-object',
  standalone: true,
  imports: [
    ToastModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-object.component.html',
  styleUrl: './create-object.component.scss'
})
export class CreateObjectComponent {
  name = new FormControl('');
  description = new FormControl('');

  constructor(private route: ActivatedRoute, private http: HttpClient, private messageService: MessageService) {}

  onSubmit() {
    try {
      this.http.post(`http://localhost:5000/objects`, {
        name: this.name.value,
        description: this.description.value
      }).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully created record!' });
        window.location.href = '/objects';
      });
    } catch (error) {
      console.error(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
    }
  }


}
