import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-object',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-object.component.html',
  styleUrl: './edit-object.component.scss'
})
export class EditObjectComponent {
  id: string | null = null;
  object: any = {};

  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  constructor(private route: ActivatedRoute, private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.http.get(`http://localhost:5000/objects/${this.id}`).subscribe(data => {
      this.object = (data as any).object ?? {};

      this.name.setValue(this.object.name);
      this.description.setValue(this.object.description);
    });
  }

  onSubmit() {
    if (this.name.invalid || this.description.invalid) {
      this.messageService.add({severity:'warn', summary: 'Error', detail: 'Please fill in all required fields'});
      return;
    }

    try {
      this.http.patch(`http://localhost:5000/objects/${this.id}`, {
        name: this.name.value,
        description: this.description.value
      }).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully updated record!' });
      });
    } catch (error) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to update record'});
    }
  }

  onConfirmDelete() {
    this.messageService.add({key: 'confirm-delete', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
  }

  onCancelDelete() {
    this.messageService.clear('confirm-delete')
  }

  onDelete() {
    try {
      this.http.delete(`http://localhost:5000/objects/${this.id}`).subscribe(() => {
        window.location.href = '/objects?deleted=true';
      })
    } catch (error) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete record'});
    }
  }
}
