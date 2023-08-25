import { test, expect, vi } from 'vitest';
import { log } from './log';

test('it spies on the multiple method', () => {
  const mock = vi.fn((x: string) => {
    if (x) {
      x.repeat(3);
    }
  });

  mock();
  mock();
  const result = mock('wow');

  vi.spyOn(console, 'log').mockImplementation(() => {});

  log('log', 1, 2, 3);

  expect(mock).toHaveBeenLastCalledWith('wow');
  expect(result).toMatchInlineSnapshot('woowwwwooowww');
  expect(console.log).toHaveBeenCalledWith(1, 2, 3);
});
