import {useEffect} from 'react';
import type {KeysMap, Options} from './hotkeys.js';
import {hotkeys} from './hotkeys.js';

export function useHotkeys(bindings: KeysMap, options?: Options, element?: HTMLElement) {
  useEffect(() => hotkeys(bindings, options, element), [bindings]);
}
