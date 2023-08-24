import { describe, expect, it } from 'vitest';
import { createPerson, Person } from '$lib/person';
import { KanbanBoard } from '$lib/kanban-board';

/**
 * toBe: https://vitest.dev/api/expect.html#tobe
 * toBeCloseTo: https://vitest.dev/api/expect.html#tobecloseto
 * toBeInstanceOf: https://vitest.dev/api/expect.html#tobeinstanceof
 * toBeUndefined: https://vitest.dev/api/expect.html#tobeundefined
 * toContain: https://vitest.dev/api/expect.html#tocontain
 * toThrow: https://vitest.dev/api/expect.html#tothrow
 * toThrowError: https://vitest.dev/api/expect.html#tothrowerror
 */

test('should pass if the two numbers would add up correctly in a language other than JavaScript', () => {
  expect(0.2 + 0.1).toBeCloseTo(0.3);
});

describe('createPerson', () => {
  test('should create an instance of a person', () => {
    const person = createPerson('Ada Lovelace');
    expect(person).toBeInstanceOf(Person);
  });
});

describe('Kanban Board', () => {
  test('should include "Backlog" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');
    // Verify that board.statuses contains "Backlog".
    expect(board.statuses).toContain('Backlog');
  });

  test('should *not* include "Bogus" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');
    // Verify that board.statuses does not contain "Bogus".
    expect(board.statuses).not.toContain('Bogus');
  });

  test('should include an added status in board.statuses using #addStatus', () => {
    const board = new KanbanBoard('Things to Do');
    // Use board.addStatus to add a status.
    // Verify that the new status is—in fact—now in board.statuses.
    board.addStatus('processing');
    expect(board.statuses).toContain('processing');
  });

  test('should remove a status using #removeStatus', () => {
    const board = new KanbanBoard('Things to Do');
    // Use board.removeStatus to remove a status.
    board.removeStatus('Backlog');
    // You can be clever or you can just assume "Backlog" is in board.statuses
    // by default.
    // Verify that the status is no longer in in board.statuses.
    expect(board.statuses).not.toContain('Backlog');
  });
});

describe('Person', () => {
  test('will create a person with a first name', () => {
    // Verify that person.firstName is correct.
    const person = new Person('Madonna');
    expect(person.firstName).toBe('Madonna');
  });

  test('will create a person with a first and last name', () => {
    const person = new Person('Madonna Cicone');
    expect.hasAssertions();
    // Verify that person.lastName is correct.
    expect(person.lastName).toBe('Cicone');
  });

  test('will create a person with a first, middle, and last name', () => {
    const person = new Person('Madonna Louise Cicone');
    // Verify that person.middleName is correct.
    expect(person.middleName).toBe('Louise');
  });

  test('will throw if you provide an empty string', () => {
    const fn = () => {
      new Person('');
    };
    // Verify that function above throws.
    expect(() => fn()).toThrowError();
  });

  test('will throw a specific error message if you provide an empty string', () => {
    const errorMessage = 'fullName cannot be an empty string';
    const fn = () => {
      new Person('');
    };
    expect(() => fn()).toThrowError(errorMessage);
    // Verify that function above throws the error message above.
  });

  test('will add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    // Verify that john.friends contains paul.
    expect(john.friends).toContain(paul);
  });

  test('will mutually add a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    // Verify that paul.friends contains john.
    expect(paul.friends).toContain(john);
  });

  test('will remove a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    // Verify that john.friends does not inclide paul.
    expect(john.friends).not.toContain(paul);
  });

  test('will mutually remove friends', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    // Verify that paul.friends does not include john.
    expect(paul.friends).not.toContain(john);
  });
});

const explode = () => {
  throw new Error('Something went terribly wrong');
};

describe('explode', () => {
  test('should throw an error', () => {
    expect(() => explode()).toThrowError();
  });

  test('should throw a specific error containing "terribly wrong"', () => {
    expect(() => explode()).toThrowError(/terribly wrong/);
  });
});
