import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth';
import { TaskBoardComponent } from './taskboard/taskboard';
import { TaskFormComponent } from './taskform/taskform';
import { TodoistService } from './services/todoist.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthComponent, TaskBoardComponent, TaskFormComponent, HttpClientModule],
  providers: [TodoistService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Neon ToDoList Project (Todoist API)';
}
