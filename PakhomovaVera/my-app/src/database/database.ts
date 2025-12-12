import * as SQLite from 'expo-sqlite';

interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  createdAt: string;
}

interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

class Database {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync('app.db');
    this.initDatabase();
  }

  private async initDatabase() {
    try {      
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          title TEXT NOT NULL,
          completed BOOLEAN DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
        );
      `);

      console.log('База данных инициализирована');
    } catch (error) {
      console.error('Ошибка инициализации базы данных:', error);
    }
  }
  
  async createUser(email: string, password: string, name?: string): Promise<number> {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [email, password, name || null]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Ошибка создания пользователя:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.db.getFirstAsync<User>(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return result;
    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      return null;
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const result = await this.db.getFirstAsync<User>(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      return null;
    }
  }
  
  async getTasksByUserId(userId: number): Promise<Task[]> {
    try {
      const result = await this.db.getAllAsync<Task>(
        'SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC',
        [userId]
      );
      return result;
    } catch (error) {
      console.error('Ошибка получения задач:', error);
      return [];
    }
  }

  async createTask(userId: number, title: string): Promise<number> {
    try {
      const result = await this.db.runAsync(
        'INSERT INTO tasks (userId, title) VALUES (?, ?)',
        [userId, title]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Ошибка создания задачи:', error);
      throw error;
    }
  }

  async updateTaskStatus(taskId: number, completed: boolean): Promise<boolean> {
    try {
      await this.db.runAsync(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [completed ? 1 : 0, taskId]
      );
      return true;
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
      return false;
    }
  }

  async deleteTask(taskId: number): Promise<boolean> {
    try {
      await this.db.runAsync('DELETE FROM tasks WHERE id = ?', [taskId]);
      return true;
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
      return false;
    }
  }

  async deleteCompletedTasks(userId: number): Promise<number> {
    try {
      const result = await this.db.runAsync(
        'DELETE FROM tasks WHERE userId = ? AND completed = 1',
        [userId]
      );
      return result.changes;
    } catch (error) {
      console.error('Ошибка удаления выполненных задач:', error);
      return 0;
    }
  }
}

export const database = new Database();