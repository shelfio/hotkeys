import {fireEvent, render, screen} from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import type {ComponentProps, ReactNode} from 'react';
import {Hotkey} from './Hotkey.js';

const onAction = jest.fn();
const renderHotkey = (props: Partial<ComponentProps<typeof Hotkey>> & {children?: ReactNode}) =>
  render(
    <>
      <Hotkey onAction={onAction} binding={'a'} {...props} />
      {props.children}
    </>
  );

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<Hotkey />', () => {
  it.each([
    // binding, evensimulated
    ['a', 'a'],
    ['a', 'A'],
    ['1', '1'],
    ['-', '-'],
    ['+', '+'],
    ['=', '='],
    ['Space', ' '],
    ['Enter', `{Enter}`],
    ['Escape', `{Escape}`],
    // Combinations
    ['g i t', 'git'],
    ['Shift+i', '{Shift>}{i}'],
    ['Alt+i', '{Alt>}{i}'],
    // Special for Mac/Windown
    ['$mod+i', '{Control>}{i}'],
    ['Meta+i', '{Meta>}{i}'],
    ['Control+i', '{Control>}{i}'],
    ['Control+Alt+i', '{Control>}{Alt>}{i}'],
  ])('setup %s listener for binding', async (binding, keyboardcode) => {
    renderHotkey({binding});

    await useEvent.keyboard(keyboardcode);

    expect(onAction).toHaveBeenCalledWith(expect.any(KeyboardEvent));
  });

  it('should allow configuring the event trigger', () => {
    renderHotkey({
      binding: 'a',
      options: {
        event: 'keyup',
      },
    });

    fireEvent.keyDown(window, {key: 'a'});

    expect(onAction).toHaveBeenCalledTimes(0);

    fireEvent.keyUp(window, {key: 'a'});

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('should change the interval between keystrokes for sequential binding', async () => {
    renderHotkey({
      binding: 'g i t',
      options: {
        timeout: 100,
      },
    });

    // Use small delay to avoid long test time
    await useEvent.keyboard('git', {delay: 100});

    expect(onAction).toHaveBeenCalledTimes(0);

    await useEvent.keyboard('git', {delay: 50});

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('should not trigger callback when typing in input elements by default', async () => {
    renderHotkey({
      binding: 'a',
      children: (
        <>
          <input placeholder={'Input'} />
          <textarea placeholder={'Textarea'} />
        </>
      ),
    });

    await useEvent.type(screen.getByPlaceholderText('Input'), 'A');
    await useEvent.type(screen.getByPlaceholderText('Textarea'), 'A');

    expect(onAction).not.toHaveBeenCalled();
  });

  it('should trigger callback when typing in input elements when enabled', async () => {
    renderHotkey({
      binding: 'a',
      options: {
        disableOnInputs: false,
      },
      children: (
        <>
          <input placeholder={'Input'} />
          <textarea placeholder={'Textarea'} />
        </>
      ),
    });

    await useEvent.type(screen.getByPlaceholderText('Input'), 'Aa');
    await useEvent.type(screen.getByPlaceholderText('Textarea'), 'A');

    expect(onAction).toHaveBeenCalledTimes(3);
  });
});
