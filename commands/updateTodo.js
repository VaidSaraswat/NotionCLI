const conf = new (require("conf"))();
const chalk = require("chalk");
const { Client } = require("@notionhq/client");
const inquirer = require("inquirer");
const getTodos = require("./getTodos");

async function updateTodos() {
  await getTodos();
  let todos = conf.get("todos");
  let choices = todos.map((todo, index) => {
    return {
      name: todo.toDo.rich_text[0].text.content,
      value: index,
    };
  });
  let questions = [
    {
      type: "list",
      name: "toDoIndex",
      message: "Which task do you want to mark as done?",
      choices: choices,
    },
  ];

  let answers = await inquirer.prompt(questions);
  markTodoDone(todos[answers.toDoIndex]);
}

async function markTodoDone(block) {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  try {
    await notion.blocks.update({
      block_id: block.blockId,
      to_do: {
        checked: true,
      },
    });
    console.log(
      chalk.red.bold(
        `Marked to-do \'${block.toDo.rich_text[0].text.content}\' as done`
      )
    );
  } catch (e) {
    console.log(chalk.green.bold(e));
  }
}

module.exports = updateTodos;
