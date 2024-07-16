export interface NewTask {
    content: string;
    description: string;
    due_date: string;
    labels: string[];
}

export interface TaskForm {
    content: string;
    description: string;
    due_date: string;
    labels: string;
}