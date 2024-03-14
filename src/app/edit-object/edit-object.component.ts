import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-object',
  standalone: true,
  imports: [
    ToastModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-object.component.html',
  styleUrl: './edit-object.component.scss'
})
export class EditObjectComponent {
  id: string | null = null;
  object: any = {};

  name = new FormControl('');
  description = new FormControl('');

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
    try {
      this.http.patch(`http://localhost:5000/objects/${this.id}`, {
        name: this.name.value,
        description: this.description.value
      }).subscribe(data => {
        console.log(data);
        console.log('Object updated');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully updated record!' });
      });
    } catch (error) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to update record'});
    }
  }

  onDelete() {
    console.log('Deleting object');
    try {
      this.http.delete(`http://localhost:5000/objects/${this.id}`).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Successfully deleted record` });
        window.location.href = '/objects';
      });
    } catch (error) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete record'});
    }
  }
}
