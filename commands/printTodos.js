const chalk = require("chalk");
const conf = new (require("conf"))();
const getTodos = require("./getTodos");

async function printTodos() {
  await getTodos();
  let todos = conf.get("todos");
  todos.forEach((todo, index) => {
    console.log(
      `${++index}.` + chalk.bold.red(todo.toDo.rich_text[0].text.content)
    );
  });
}

module.exports = printTodos;
