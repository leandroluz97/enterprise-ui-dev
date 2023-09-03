import { test, expect, vi } from 'vitest';
import { log } from './log';
import { useDispatch } from 'react-redux';

//test.todo('it spies on the multiply method');

vi.mock('react-redux', (args) => {
  return {
    useDispatch() {},
  };
});
