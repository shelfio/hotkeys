import {tinykeys} from 'tinykeys';
import type {KeyBindingMap, KeyBindingOptions} from 'tinykeys';

export type Options = KeyBindingOptions & {
  disableOnInputs?: boolean;
};

export type KeysMap = KeyBindingMap;

function isEventElement(target: KeyboardEvent['target']): target is HTMLElement {
  return target instanceof HTMLElement;
}

function isEventTargetInputOrTextArea(target: KeyboardEvent['target']) {
  if (!isEventElement(target)) {
    return false;
  }

  const targetElementName = target.tagName.toLowerCase();

  return ['input', 'textarea'].includes(targetElementName) || target.contentEditable === 'true';
}

function getKeybindings(keybindingsMap: KeysMap, options: Options) {
  if (!options.disableOnInputs) {
    return keybindingsMap;
  }

  return Object.fromEntries(
    Object.entries(keybindingsMap).map(([key, handler]) => [
      key,
      (event: KeyboardEvent) => {
        if (!isEventTargetInputOrTextArea(event.target)) {
          handler(event);
        }
      },
    ])
  );
}

export function hotkeys(
  keybindingsMap: KeyBindingMap,
  {disableOnInputs = true, ...restOptions}: Options = {},
  element?: Parameters<typeof tinykeys>[0]
) {
  return tinykeys(
    element ?? window,
    getKeybindings(keybindingsMap, {disableOnInputs}),
    restOptions
  );
}
