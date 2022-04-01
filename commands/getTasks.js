const { Client } = require("@notionhq/client");
const chalk = require("chalk");

const formatDate = (date) => {
  let newDate = new Date(date);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    month[newDate.getMonth()] +
    " " +
    (newDate.getDate() + 1) +
    " " +
    newDate.getFullYear()
  );
};
async function getTasks() {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = process.env.NOTION_DATABASE_ID;
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    response.results.forEach((page, index) => {
      //If it contains a title then print the task title and date due
      if (page.properties.Name.title.length > 0) {
        const status = page.properties.Status.select.name;
        const taskName = page.properties.Name.title[0].text.content;
        const dueDate = formatDate(page.properties.Due.date.start);
        console.log(
          chalk.red.bold(++index + ": " + taskName) +
            " " +
            chalk.blue.bold("[Status: " + status + "]") +
            " " +
            chalk.green.bold("[Due: " + dueDate + "]")
        );
      }
    });
  } catch (e) {
    console.log(chalk.green.bold(e));
  }
}

module.exports = getTasks;
