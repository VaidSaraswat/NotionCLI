#! /usr/bin/env node
const { program } = require("commander");
const printTasks = require("./commands/printTasks");
const updateTask = require("./commands/updateTask");
const createTask = require("./commands/createTask");
program
  .command("get-tasks")
  .description("Lists all the task in your notion task list")
  .action(printTasks);

program
  .command("update-task")
  .description("Updates the status of a task list item")
  .action(updateTask);

program
  .command("create-task")
  .description("Creates a new task on the task list")
  .action(createTask);

program.parse();
