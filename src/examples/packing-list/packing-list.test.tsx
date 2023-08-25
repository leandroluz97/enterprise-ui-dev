import { fireEvent, render, screen } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const button = screen.getByRole('button', { name: /Add New Item/i });
  const input = screen.getByPlaceholderText('New Item');

  fireEvent.change(input, { target: { value: '' } });
  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByRole('button', { name: /Add New Item/i });
  const input = screen.getByPlaceholderText('New Item');

  expect(button).toBeDisabled();
  await user.type(input, 'Hello, World!');
  expect(button).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByRole('button', { name: /Add New Item/i });
  const input = screen.getByPlaceholderText('New Item');

  await user.type(input, 'Asus vivobook pro');
  await user.click(button);

  expect(screen.getByLabelText('Asus vivobook pro')).not.toBeChecked();
});
