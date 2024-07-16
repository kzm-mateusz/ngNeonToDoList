import { Component } from '@angular/core';
import { TodoistService } from '../services/todoist.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.html',
  imports: [FormsModule],
  styleUrl: '../app.component.css',
})

export class AuthComponent {
  token: string = '';

  constructor(private todoistService: TodoistService) {}

  setToken() {
    this.todoistService.setToken(this.token);
    //console.log('Token set:', this.token);

  
    this.todoistService.getTasks().subscribe({
      next:(tasks) => {
        //console.log('Tasks:', tasks);
      },
      error:() => {
        alert('Invalid token. Please try again.');
        // Reloading page after submitting invalid token, otherwise it will not process another one
        window.location.reload(); 
      }
  });
  }
}
