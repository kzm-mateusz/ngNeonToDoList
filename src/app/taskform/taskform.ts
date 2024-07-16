import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { TodoistService } from '../services/todoist.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskForm } from '../data.models/data.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './taskform.html',
  imports: [FormsModule],
  styleUrl: '../app.component.css',
})

export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<void>(); //for emit() to work
  @ViewChild('form') form: NgForm; //for reset() to work

  task: TaskForm = {
    content: '',
    description: '',
    due_date: '', // snake_case because API ignored camelCased or nested date property (maybe it is better with SDK)
    labels: '',
  };

  constructor(private todoistService: TodoistService) {
    this.form = new NgForm([], []); //for reset() to work
  }

  createTask() {
    const newTask = {
      content: this.task.content,
      description: this.task.description,
      due_date: this.task.due_date,
      labels: this.task?.labels?.split(',').map((label: string) => label.trim()) || [],
      // W/out optional empty array split() caused error if no labels were given
    }

    this.todoistService.newTask(newTask).subscribe(() => {
      this.taskCreated.emit(); // Reloading the task list
    });

    this.form.reset(); // Cleaning the form after creating new task
  }
}
