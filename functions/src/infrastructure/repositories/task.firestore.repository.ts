import { ITaskRepository } from "../../domain/repositories/task.respository";
import { Task } from "../../domain/entities/task.entity";
import { db } from "../database/firestore.singleton";

export class TaskFirestoreRepository implements ITaskRepository {
  private collection = db.collection("tasks");

  async create(task: Task): Promise<Task> {
    const docRef = this.collection.doc();
    await docRef.set({
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
    });
    return new Task(
      docRef.id,
      task.title,
      task.description,
      task.status,
      task.createdAt,
      task.userId,
    );
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    const snapshot = await this.collection.where("userId", "==", userId).get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return new Task(
        doc.id,
        data.title,
        data.description,
        data.status,
        data.createdAt.toDate(),
        data.userId,
      );
    });
  }

  async findById(id: string): Promise<Task | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    return new Task(
      doc.id,
      data.title,
      data.description,
      data.status,
      data.createdAt.toDate(),
      data.userId,
    );
  }

  async update(task: Task): Promise<Task> {
    const docRef = this.collection.doc(task.id);
    await docRef.update({
      title: task.title,
      description: task.description,
    });
    return task;
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
