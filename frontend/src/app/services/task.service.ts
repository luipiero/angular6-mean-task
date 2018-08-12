import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url: string;
  // url: string = 'www.myurlapi.com/';

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000';
  }

  getTasks() {
    return this.http.get<Task[]>(`${this.url}/api/tasks`)
      ;
  }

  addTask(newTask: Task) {
    return this.http.post<Task>(`${this.url}/api/tasks`, newTask)
      ;
  }

  deleteTask(id) {
    return this.http.delete<Task>(`${this.url}/api/tasks/${id}`)
      ;
  }

  updateTask(newTask) {
    return this.http.put<Task>(`${this.url}/api/tasks/${newTask._id}`, newTask)
      ;
  }
}
