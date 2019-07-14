import * as _ from "lodash";

function sleep(ms: number)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Queue
{
    private tasks: Array<Task | AnotherTask> = [];

    public AddTask(task: Task | AnotherTask)
    {
        this.tasks.push(task);
    }

    public async Run()
    {
        while (true) {
            if (this.tasks.length > 0) {
                const task = this.tasks[0];

                await task();

                this.tasks = this.tasks.slice(1);
            }
            else {
                await sleep(5000);
            }
        }
    }
}

type Task = () => Promise<void>;
type AnotherTask = () => void;

export const TasksQueue = new Queue();
