import { create } from 'zustand'

interface ITimerState {
    seconds: number;
    isRunning: boolean;
    timerId: any;
    increment: () => void;
    setSeconds: (value: number) => void;
    setIsRunning: (value: boolean) => void;
    setTimerId: (value: any) => void;
}

const useTimerStore = create<ITimerState>()((set) => ({
    seconds: 0,
    isRunning: false,
    timerId: null,
    increment: () => set((state) => ({ seconds: state.seconds + 1})),
    setSeconds: (value) => set(() => ({seconds: value})),
    setIsRunning: (value) => set(() => ({isRunning: value})),
    setTimerId: (value) => set(() => ({timerId: value})),
}))

export const useSeconds = () => useTimerStore((state) => state.seconds);
export const useIsRunning = () => useTimerStore((state) => state.isRunning);
export const useTimerId = () => useTimerStore((state) => state.timerId);
export const useTimerActions = () => ({
    incrementSeconds: () => useTimerStore.getState().increment(),
    setTotalSeconds: (value: number) => useTimerStore.getState().setSeconds(value),
    setIsRunning: (value: boolean) => useTimerStore.getState().setIsRunning(value),
    setTimerId: (value: any) => useTimerStore.getState().setTimerId(value),
});