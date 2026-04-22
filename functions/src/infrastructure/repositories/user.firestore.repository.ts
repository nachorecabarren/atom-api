import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { db } from "../database/firestore.singleton";

export class UserFirestoreRepository implements IUserRepository {
  private collection = db.collection("users");

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();
    let createdAt: Date;
    if (data.createdAt && typeof data.createdAt.toDate === "function") {
      createdAt = data.createdAt.toDate();
    } else {
      createdAt = data.createdAt || new Date();
    }
    return new User(doc.id, data.email, createdAt);
  }

  async create(user: User): Promise<User> {
    const docRef = this.collection.doc();
    await docRef.set({
      email: user.email,
      createdAt: user.createdAt,
    });
    return new User(docRef.id, user.email, user.createdAt);
  }
}
