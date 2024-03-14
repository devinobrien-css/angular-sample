import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  constructor(private route: ActivatedRoute, private http: HttpClient, private messageService: MessageService) {}

  onSubmit() {
    if (this.name.invalid || this.description.invalid) {
      this.messageService.add({severity:'warn', summary: 'Error', detail: 'Please fill in all required fields'});
      return;
    }

    try {
      this.http.post(`http://localhost:5000/objects`, {
        name: this.name.value,
        description: this.description.value
      }).subscribe(() => {
        window.location.href = '/objects?created=true';
      });
    } catch (error) {
      console.error(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
    }
  }


}
