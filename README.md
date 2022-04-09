# NotionCLI
This is a CLI tool which uses Notions API to mark update the progess of tasks and also mark todo items as done within notion.

# Getting Started
1. Follow Notions documentation to get an api key: https://developers.notion.com/docs/getting-started
2. Export this key as a global variables in your desired shell: `export NOTION_KEY="SECRET_KEY"`
3. For the CLI to access any page you must also share it with the specific page in Notion (todo list, task viewer, etc.). Follow this in order to give the CLI access to whichever page you want: https://developers.notion.com/docs/getting-started#step-2-share-a-database-with-your-integration
4. For the task viewer page: Click 'Share' and copy the link provided. You will need to export the database id found within the url. The database ID is the part of the URL after your workspace name (if you have one) and the slash (myworkspace/) and before the question mark (?). For example https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=. Export this id as global variable in your shell:`export NOTION_DATABASE_ID="a8aec43384f447ed84390e8e42c2e089"`
5. For the todo list page: Open the page in Notion. Use the Share menu to Copy link. Now paste the link in your text editor so you can take a closer look. The URL ends in a page ID. In this case you will need to export the page ID found at the end of the url. It should be a 36 character long string. Export this a global variable like so: `export NOTION_PAGE_ID="PAGE_ID"`.
6. You're now ready to go!

# Supported Commands
1. `notioncli get-tasks`: Lists all the task in your notion task list
2. `notioncli update-task` Updates the status of a task list item
3. `notioncli create-task`: Creates a new task on the task list
4. `notioncli get-todos`: Gets the list of to-do items
5. `notioncli update-todo`: Updates the todo as done
