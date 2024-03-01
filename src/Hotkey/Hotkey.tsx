import type {Options} from '../hotkeys.js';
import {useHotkeys} from '../useHotkeys.js';

export type HotkeyProps = {
  binding: string;
  onAction(event: KeyboardEvent): void;
  options?: Options;
  element?: HTMLElement;
};

export function Hotkey(props: HotkeyProps) {
  useHotkeys({[props.binding]: props.onAction}, props.options, props.element);

  return null;
}
