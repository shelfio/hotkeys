# @shelf/hotkeys

> A tiny (1Kb) set of React hotkeys utilities to make great user experience 🚀.
> Build on top of [tinykeys](https://github.com/jamiebuilds/tinykeys)

Features:

- [x] Global hotkeys
- [x] Element hotkeys
- [x] Modifiers support
- [x] Sequence hotkeys
- [x] Disabled on input elements by default
- [x] TypeScript support

## Installation

```sh
yarn add @shelf/hotkeys react
```

## Usage

```tsx
import {Hotkey} from '@shelf/hotkeys';

function Demo() {
  return (
    <Hotkey
      binding={'$mod+a'}
      onAction={() => {
        // Do some amazing stuff 🚀
      }}
    />
  );
}
```

### Hotkey

`binding`
See [tinykeys](https://github.com/jamiebuilds/tinykeys/blob/main/README.md#commonly-used-keys-and-codes) for more info

`onAction`
Function to be called when hotkey is pressed. Accept Keyboard event as first argument.

`options.disableOnInputs`
Disable hotkey when input/textarea element is focused. Default: `true`

Examples:

```tsx
<Hotkey binding={'a'} onAction={}/> // single key case insensitive
<Hotkey binding={'1'} onAction={}/> // number keys
<Hotkey binding={'Escape'} onAction={}/>
<Hotkey binding={'Enter'} onAction={}/>

// ⌘ + a on macOS, Ctrl + a on Windows and Linux
<Hotkey binding={'$mod+a'} onAction={}/>

// sequence hotkey support by empty space
<Hotkey binding={'g i'} onAction={}/>

// combination of keys, make sure no spaces between keys
<Hotkey binding={'Control+a'} onAction={}/>

// $mod is a special key for ⌘ on macOS and Ctrl on Windows and Linux
<Hotkey binding={'$mod+a'} onAction={}/>


// Prevent default browser action opening new tab
<Hotkey binding={'$mod+T'} onAction={event => {
  event.preventDefault();
}}/>


// Enable hotkey when input/textarea element is focused
<Hotkey
  binding={'a'}
  onAction={}
  options={{
    disableOnInputs: false,
    event: 'keyup' // default is keydown
  }}
/>
```

### useHotkeys

`useHotkeys(keymap, [options], [element])` is a hook that allows you to register multiple hotkeys at once.

```tsx
import {useHotkeys} from '@shelf/hotkeys';

function Demo() {
  useHotkeys(
    {
      '$mod+a': () => {},
      'g i': () => {},
      // Do some amazing stuff 🚀
    },
    {
      disableOnInputs: false,
    }
  );

  return <div>...</div>;
}
```
