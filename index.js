#! /usr/bin/env node
const { program } = require("commander");
const getTasks = require("./commands/getTasks");

program
  .command("get-tasks")
  .description("Lists all the task in your notion task list")
  .action(getTasks);

program.parse();

// async function getPageId() {
//   try {
//     const response = await notion.databases.retrieve({
//       database_id: databaseId,
//     });
//     console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function getPagesInDb() {
//   try {
//     const response = await notion.databases.query({
//       database_id: databaseId,
//     });
//     console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function getSpecificPage(pageId) {
//   try {
//     const response = await notion.pages.retrieve({ page_id: pageId });
//     console.log(response);
//     console.log(response.properties.Due.date);
//     console.log(response.properties.Status.select);
//     // console.log(response.properties.Tags.multi_select);
//     // console.log(response.properties.Name.title);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function updateSecificPage(pageId) {
//   try {
//     const response = await notion.pages.update({
//       page_id: pageId,
//       properties: {
//         Name: {
//           title: [
//             {
//               type: "text",
//               text: {
//                 content: "Grape",
//               },
//             },
//           ],
//         },
//       },
//     });
//     console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function updateTaskListPage(pageId) {
//   try {
//     const response = await notion.pages.update({
//       page_id: pageId,
//       properties: {
//         Status: {
//           select: {
//             name: "To Do",
//           },
//         },
//       },
//     });
//     console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// }

// getPageId();
// getPagesInDb();
// getSpecificPage("d4061b12-7573-42f2-aaf5-e642e45560bf");
// updateTaskListPage("d4061b12-7573-42f2-aaf5-e642e45560bf");
// updateSecificPage("93e095bb-41e9-4e52-b3a7-9c04ec74b3f9");

//TODO Figure out how to add task lists
/*
notioncli get-tasks -> returns the list of pages in the task lists with various properties ex: Report Due (Nov 2) Status: To Do 
notioncli create-task -> prompts user for various set of parameters. 1. Task name 2. Due Date (YYYY-MM-DD)
notioncli update-task -> lists task -> user choose from the list by entering task number -> cli them prompts for which status 1.To Do 2. Doing 3. Done
*/
