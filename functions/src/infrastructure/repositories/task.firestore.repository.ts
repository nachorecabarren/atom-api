import { ITaskRepository } from "../../domain/repositories/task.respository";
import { Task } from "../../domain/entities/task.entity";
import { db } from "../database/firestore.singleton";

export class TaskFirestoreRepository implements ITaskRepository {
  private collection = db.collection("tasks");

  async create(task: Task): Promise<Task> {
    try {
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
    } catch (error) {
      console.error("Firestore error creating task:", error);
      throw new Error("Database error: could not create task");
    }
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    try {
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
    } catch (error) {
      console.error("Firestore error fetching tasks by user:", error);
      throw new Error("Database error: could not fetch tasks");
    }
  }

  async findById(id: string): Promise<Task | null> {
    try {
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
    } catch (error) {
      console.error("Firestore error fetching task by id:", error);
      throw new Error("Database error: could not fetch task");
    }
  }

  async update(task: Task): Promise<Task> {
    try {
      const docRef = this.collection.doc(task.id);
      await docRef.update({
        title: task.title,
        description: task.description,
        status: task.status,
      });
      return task;
    } catch (error) {
      console.error("Firestore error updating task:", error);
      throw new Error("Database error: could not update task");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.collection.doc(id).delete();
    } catch (error) {
      console.error("Firestore error deleting task:", error);
      throw new Error("Database error: could not delete task");
    }
  }
}
