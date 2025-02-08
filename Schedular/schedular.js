
// Defining tasks

const tasks = [
    { id: "task1", processingTime: 2, dependencies: [], priority: 1 },
    { id: "task2", processingTime: 1, dependencies: ["task1"], priority: 2 },
    { id: "task3", processingTime: 3, dependencies: ["task1"], priority: 1 },
    { id: "task4", processingTime: 1, dependencies: ["task2", "task3"], priority: 3 },
    { id: "task5", processingTime: 2, dependencies: ["task4"], priority: 2 },
    { id: "task6", processingTime: 2, dependencies: ["task5"], priority: 1 },
    { id: "task7", processingTime: 1, dependencies: ["task5"], priority: 3 },
    { id: "task8", processingTime: 2, dependencies: ["task5"], priority: 2 }
];

export class TaskSchedular {
    constructor (maxConcurrent) {
        this.maxConcurrent = maxConcurrent;
        this.tasks = new Map();
        this.completedTask = new Set();
        this.runninTask = 0;
        this.taskQueue = [];
    }

    addTask(tasks) {
        tasks.forEach(task => {
            this.tasks.set(task.id, {...task, dependencies: new Set(task.dependencies)});
        });
    }

    canRun(task) {
        return [...task.dependencies].every(dep => this.completedTask.has(dep));
    }

    runNext() {
        if(this.runninTask >= this.maxConcurrent) return;
        let executableTasks = [...this.tasks.values()]

        while(this.runninTask < this.maxConcurrent && executableTasks.length > 0) {
            let nextTask = executableTasks.shift();
            this.executeTask(nextTask);
        }
    }

    executeTask(task) {
        if(!task) return;

        this.runninTask++;
        console.log(`Task ${task.id} started. (Priority: ${task.priority})`);
        
        setTimeout(() => {
            console.log(`Task ${task.id} completed. `);

            this.runninTask--;

            this.tasks.delete(task.id);
            this.runNext();

        }, task.processingTime * 1000)

    }

    run() {
        this.runNext();
    }
}

const taskSchedular = new TaskSchedular(2);
taskSchedular.addTask(tasks);
taskSchedular.run();