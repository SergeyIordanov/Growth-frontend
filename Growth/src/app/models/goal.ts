import { Step } from './step';

export class Goal {
    id: string;
    title: string;
    completed: boolean;
    goalYear: number;
    goalMonth: string;
    steps: Step[];
}