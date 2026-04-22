export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: TaskStatus,
    public createdAt: Date,
    public userId: string
  ) {}

  isValid(): boolean {
    return this.title.trim().length > 0;
  }
}
