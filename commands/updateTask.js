const chalk = require("chalk");
const getTasks = require("./getTasks");
const conf = new (require("conf"))();
const { Client } = require("@notionhq/client");
const inquirer = require("inquirer");

async function updateTask() {
  await getTasks();
  let tasks = conf.get("tasks");
  let choices = tasks.map((task, index) => {
    return {
      name: `${chalk.red.bold(task.taskName)} ${chalk.blue.bold(
        `[Status: ${task.status}]`
      )} ${chalk.green.bold(`[Due: ${task.dueDate}]`)}`,
      value: index,
    };
  });

  let questions = [
    {
      type: "list",
      name: "taskIndex",
      message: "Which task do you want to update?",
      choices: choices,
    },
    {
      type: "list",
      name: "status",
      message: "What is the new status of the task?",
      choices: ["To Do", "Doing", "Done"],
    },
  ];
  let answers = await inquirer.prompt(questions);

  //Update the task
  await updateTaskStatus(tasks[answers.taskIndex], answers.status);
}
async function updateTaskStatus(task, newStatus) {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  try {
    await notion.pages.update({
      page_id: task.pageId,
      properties: {
        Status: {
          select: {
            name: newStatus,
          },
        },
      },
    });
    console.log(
      chalk.red.bold(
        `Updated status of task \'${task.taskName}\' from \'${task.status}\' to \'${newStatus}\'`
      )
    );
  } catch (e) {
    console.log(chalk.green.bold(e));
  }
}

module.exports = updateTask;
