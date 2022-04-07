const { Client } = require("@notionhq/client");
const formatPageId = require("./util/formatePageId");
const conf = new (require("conf"))();
const chalk = require("chalk");

async function getTodos() {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  //Format page_id as per notions requirements: https://developers.notion.com/docs/working-with-page-content
  const pageId = formatPageId(process.env.NOTION_PAGE_ID);
  let blocks = [];
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    response.results.forEach((block) => {
      if (block.to_do && !block.to_do.checked) {
        blocks.push({ blockId: block.id, toDo: block.to_do });
      }
    });
    conf.set("todos", blocks);
  } catch (e) {
    console.log(chalk.green.bold(e));
  }
}

module.exports = getTodos;
