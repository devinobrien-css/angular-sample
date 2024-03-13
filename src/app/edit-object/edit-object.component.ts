import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-object',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    // Retrieve the ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.http.get(`http://localhost:5000/objects/${this.id}`).subscribe(data => {
      console.log(data);
      this.object = (data as any).object ?? {};

      this.name.setValue(this.object.name);
      this.description.setValue(this.object.description);
    });
  }

  onSubmit() {
    console.log('Submitting form');
    console.log(this.name.value);
    console.log(this.description.value);

    try {
      this.http.patch(`http://localhost:5000/objects/${this.id}`, {
        name: this.name.value,
        description: this.description.value
      }).subscribe(data => {
        console.log(data);
        console.log('Object updated');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      });
    } catch (error) {
      console.error(error);
      console.error('Failed to update object');
    }
  }
}
