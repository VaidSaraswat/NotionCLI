const chalk = require("chalk");
const { Client } = require("@notionhq/client");
const inquirer = require("inquirer");
const formatDate = require("./util/formatDate");

async function createTask() {
  inquirer.registerPrompt("date", require("inquirer-date-prompt"));

  let questions = [
    {
      type: "input",
      name: "taskName",
      message: "Enter the the name of the new task:",
    },
    {
      type: "date",
      name: "dueDate",
      message: "Select the date this task is due (YYYY-MM-DD)",
    },
  ];

  let answers = await inquirer.prompt(questions);
  //Need to set hours 4 hours behind due to offset caused when saving task to notion
  const newDate = new Date(answers.dueDate);
  newDate.setHours(newDate.getHours() - 4);
  answers.dueDate = newDate;

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
            time_zone: "America/Toronto",
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
