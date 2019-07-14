import * as _ from "lodash";
import { Logger } from "@nestjs/common";

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
        Logger.log("Running " + this.tasks.length + " start tasks");

        while (true) {
            if (this.tasks.length > 0) {
                const task = this.tasks[0];

                Logger.log("~~ Starting task ~~", "TasksQueue");
                await task();

                this.tasks = _.drop(this.tasks, 1);
            }
            else {
                await sleep(4000);
            }

            await sleep(1000);
        }
    }
}

type Task = () => Promise<void>;
type AnotherTask = () => void;

export const TasksQueue = new Queue();
