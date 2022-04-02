const chalk = require("chalk");
const getTasks = require("./getTasks");
const conf = new (require("conf"))();
const { Client } = require("@notionhq/client");
const inquirer = require("inquirer");

async function updateTask() {
  await getTasks();
  let status = ["To Do", "Doing", "Done"];
  //Ask user for which task they want to update and the new status should be
  let questions = [
    {
      type: "input",
      name: "taskNum",
      message: "Enter the task number of which you want to update:",
    },
    {
      type: "input",
      name: "statusNum",
      message: "Enter the new task status [1: To Do 2: Doing 3: Done]:",
    },
  ];

  let answers = await inquirer.prompt(questions);

  const taskNum = parseInt(answers.taskNum - 1);
  const statusNum = parseInt(answers.statusNum - 1);

  let task = conf.get("tasks")[taskNum];

  //Update the task
  await updateTaskStatus(task, status[statusNum]);
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
        `Updated status of ${task.taskName} from \'${task.status}\' to \'${newStatus}\'`
      )
    );
  } catch (e) {
    console.log(chalk.green.bold(e));
  }
}

module.exports = updateTask;
