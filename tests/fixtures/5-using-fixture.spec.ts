import { test, expect } from './4-new-fixture';

test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.switchToDarkMode();
});

test('basic test', async ({ todoPage, page }) => {
    await todoPage.addToDo('something nice');
    await expect(page.getByTestId('todo-title')).toContainText(['something nice']);
});