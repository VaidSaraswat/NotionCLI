const chalk = require("chalk");
const { Client } = require("@notionhq/client");
const inquirer = require("inquirer");
const formatDate = require("./util/formatDate");

async function createTask() {
  let questions = [
    {
      type: "input",
      name: "taskName",
      message: "Enter the the name of the new task:",
    },
    {
      type: "input",
      name: "dueDate",
      message: "Enter the date this task is due (YYYY-MM-DD):",
    },
  ];

  let answers = await inquirer.prompt(questions);
  await createPage(answers);
}

async function createPage(answers) {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  try {
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        Due: {
          date: {
            start: answers.dueDate,
            end: null,
            time_zone: null,
          },
        },
        Status: {
          select: {
            name: "To Do",
          },
        },
        Name: {
          title: [
            {
              text: {
                content: answers.taskName,
              },
            },
          ],
        },
      },
    });
    console.log(
      chalk.red.bold(
        `Created new task \'${answers.taskName}\' due ${formatDate(
          answers.dueDate
        )}`
      )
    );
  } catch (e) {
    console.log(chalk.green.bold(e));
  }
}

module.exports = createTask;
