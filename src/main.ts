import * as appmodulepath from "app-module-path";
appmodulepath.addPath(__dirname);

import * as dotenv from "dotenv";
const config = dotenv.config().parsed as any;

import { App } from "app";
import { TasksQueue } from "tasksqueue";
const app = new App(config);

app.bootstrap();

setTimeout(() => TasksQueue.Run(), 3000);
