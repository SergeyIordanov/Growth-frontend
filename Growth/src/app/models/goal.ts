import { Step } from './step';

export class Goal {
    id: number;
    Title: string;
    Completed: boolean;
    GoalYear: number;
    GoalMonth: string;
    Steps: Step[];
}