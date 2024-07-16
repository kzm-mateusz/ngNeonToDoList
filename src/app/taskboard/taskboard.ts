import { Component, OnInit, EventEmitter } from '@angular/core';
import { TodoistService } from '../services/todoist.service';
import { DatePipe, NgFor, NgIf,} from '@angular/common';
import { TaskFormComponent } from '../taskform/taskform';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './taskboard.html',
  imports: [NgFor, NgIf, TaskFormComponent, DatePipe,],
})
export class TaskBoardComponent implements OnInit {
  tasks: any[] = [];
  taskCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private todoistService: TodoistService) {
    this.taskCreated.subscribe(() => this.loadTasks());
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoistService.getTasks().subscribe(tasks => {
      this.tasks = tasks.map((task: any[]) => ({ ...task, showDetails: false }));
    });
  }

  //Card details toggle
  toggleDetails(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.showDetails = !task.showDetails;
    }
  }

  //Complete task
  completeTask(taskId: number) {
    this.todoistService.completeTask(taskId).subscribe(() => {
      this.loadTasks(); // Reload tasks to update the taskboard
    });
  }
}
