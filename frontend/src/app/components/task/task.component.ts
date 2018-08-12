import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  title: string;

  constructor(private taskService: TaskService) {
    this.getTasks();
  }

  ngOnInit() {

  }

  getTasks() {
    this.taskService.getTasks()
      .subscribe(tasks => {
        console.log(tasks);
        this.tasks = tasks;
      });
  }

  addTask(event) {
    event.preventDefault();

    const newTask: Task = {
      title: this.title,
      isDone: false
    };
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      });
  }

  deleteTask(id) {
    const response = confirm('are you sure to delete it?');
    if (response) {
      const tasks = this.tasks;

      this.taskService.deleteTask(id)
        .subscribe(data => {
          console.log(data.n);
          console.log(data);
          if (data.n === 1) {
            for (let i = 0; i < tasks.length; i++) {
              if (tasks[i]._id === id) {
                tasks.splice(i, 1);
              }
            }
          }
        });
    }
  }

  updateStatus(task: Task) {
    const newTask = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };
    this.taskService.updateTask(newTask)
      .subscribe(res => {
        task.isDone = !task.isDone;
      });
  }

}
