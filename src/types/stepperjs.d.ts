declare module 'stepperjs' {
    export interface StepperOptions {
        duration: number;
        easing: (t: number) => number; // Easing function type
        loop: boolean;
        reverse: boolean;
    }
    export default class Stepper {
        constructor(options: StepperOptions);
        start(): void;
        stop(): void;
        on(events: { start?: () => void, update?: (n: number) => void, done?: () => void }): void;
    }
}