const chalk = require("chalk");
const conf = new (require("conf"))();
const getTasks = require("./getTasks");

async function printTasks() {
  await getTasks();
  let tasks = conf.get("tasks");
  tasks.forEach((task, index) => {
    console.log(
      `${++index}: ${chalk.red.bold(task.taskName)} ${chalk.blue.bold(
        `[Status: ${task.status}]`
      )} ${chalk.green.bold(`[Due: ${task.dueDate}]`)}`
    );
  });
}

module.exports = printTasks;
