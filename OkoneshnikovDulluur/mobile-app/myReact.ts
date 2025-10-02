import React from "react";

let hooks: any[] = [];
let depsList: any[][] = [];
let cleanups: Array<(() => void) | null> = [];
let cursor = 0;

let scheduleUpdate: (() => void) | null = null;
let effectsQueue: Array<() => void> = [];

function depsEqual(a?: any[], b?: any[]) {
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (!Object.is(a[i], b[i])) return false;
  return true;
}

export function useState<T>(
  initial: T
): [T, (v: T | ((prev: T) => T)) => void] {
  const i = cursor++;
  if (hooks[i] === undefined) hooks[i] = initial;

  const setState = (v: T | ((prev: T) => T)) => {
    const next = typeof v === "function" ? (v as (p: T) => T)(hooks[i]) : v;
    if (!Object.is(next, hooks[i])) {
      hooks[i] = next;
      scheduleUpdate && scheduleUpdate();
    }
  };

  return [hooks[i] as T, setState];
}

export function useMemo<T>(factory: () => T, deps: any[] = []): T {
  const i = cursor++;
  if (!depsEqual(depsList[i], deps)) {
    hooks[i] = factory();
    depsList[i] = deps;
  }
  return hooks[i] as T;
}

export function useEffect(effect: () => void | (() => void), deps: any[] = []) {
  const i = cursor++;
  const changed = !depsEqual(depsList[i], deps);
  depsList[i] = deps;

  if (changed) {
    effectsQueue.push(() => {
      // cleanup предыдущего эффекта
      if (cleanups[i]) {
        try {
          cleanups[i]!();
        } catch {}
      }
      const cleanup = effect();
      cleanups[i] = typeof cleanup === "function" ? cleanup : null;
    });
  }
}

// Рендер: используй в RN, чтобы обновлять корневой элемент
export function render(Component: () => JSX.Element, setTree: (el: JSX.Element) => void) {
  function update() {
    cursor = 0;
    effectsQueue = [];

    const tree = Component();
    setTree(tree);

    // Запускаем эффекты ПОСЛЕ "коммита"
    for (const run of effectsQueue) run();
  }

  scheduleUpdate = update;
  update();
}
