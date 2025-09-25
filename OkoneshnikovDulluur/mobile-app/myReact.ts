let state: any;
let setStateCallback: (() => void) | null = null;

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
  state = state !== undefined ? state : initialValue;

  function setState(newValue: T) {
    state = newValue;
    if (setStateCallback) setStateCallback();
  }

  return [state, setState];
}

export function render(update: () => void) {
  setStateCallback = update;
  update();
}
