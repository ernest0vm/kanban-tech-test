import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName: string;

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
    this.taskName = '';
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  addTask = (name: string) => {
    if (name != '') {
      let task = {
        name: name,
        stage: 0
      }

      this.tasks.push(task);
      this.taskName = '';
      this.configureTasksForRendering();
    }
  }

  deleteTask = (task: Task) => {
    let index = this.tasks.indexOf(task)
    this.tasks.splice(index, 1);
    this.configureTasksForRendering();
  }

  moveTaskToRight = (task: Task) => {
    let index = this.tasks.indexOf(task)
    if (this.tasks[index].stage >= 0 && this.tasks[index].stage < (this.stagesNames.length - 1)) {
      this.tasks[index].stage += 1
    }
    this.configureTasksForRendering();
  }

  moveTaskToLeft = (task: Task) => {
    let index = this.tasks.indexOf(task)
    if (this.tasks[index].stage > 0 && this.tasks[index].stage <= (this.stagesNames.length - 1)) {
      this.tasks[index].stage -= 1
    }
    this.configureTasksForRendering();
  }
}

interface Task {
  name: string;
  stage: number;
}