//@vitest-environment happy-dom

import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from './test/utilities';

test('it should render the component', () => {
  //   screen.debug(document.body)
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
  const button = screen.getByRole('button', { name: 'Increment' });
  await user.click(button);
  expect(currentCount).toHaveTextContent('1');
});

// test('it should increment when the "Increment" button is pressed', async () => {
//   const user = userEvent.setup();
//   render(<Counter />);
//   const currentCount = screen.getByTestId('current-count');
//   expect(currentCount).toHaveTextContent('0');
//   const button = screen.getByRole('button', { name: 'Increment' });
//   //   fireEvent.click(button);
//   await user.click(button);
//   expect(currentCount).toHaveTextContent('1');
// });
