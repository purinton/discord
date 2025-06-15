import { myModule } from '@purinton/discord';
import { jest, test, expect } from '@jest/globals';

test('myModule returns expected string', () => {
  expect(myModule()).toBe('Hello from template ESM');
});
