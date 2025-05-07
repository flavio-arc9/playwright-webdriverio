import { test as base, expect } from '@playwright/test';
import { TodoPage } from './todo-page';

type Account = {
  username: string;
  password: string;
};

// Note that we pass worker fixture types as a second template parameter.
export const test = base.extend<{}, { account: Account }>({
  account: [async ({ browser }, use, workerInfo) => {
    // Unique username.
    const username = 'user' + workerInfo.workerIndex;
    const password = 'verysecure';

    // Create the account with Playwright.
    const page = await browser.newPage();
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addToDo(username);
    await todoPage.addToDo(password);
    await page.close();

    // Use the account value.
    await use({ username, password });
  }, { scope: 'worker' }],

  page: async ({ page, account }, use) => {
    // Sign in with our account.
    const { username, password } = account;
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addToDo(username);
    await todoPage.addToDo(password);
    console.log('Signed in with', username, password);
    // Wait for the page to load.
    // Use signed-in page in the test.  
    await use(page);
  },
});
export { expect } from '@playwright/test';

test.describe('TodoMVC', () => {
  test('should add an item', async ({ page }) => {
    console.log('Adding item');
  });

  test('should remove an item', async ({ page }) => {
    console.log('Removing item');
  });
  test('should check an item', async ({ page }) => {
    console.log('Checking item');
  });
});