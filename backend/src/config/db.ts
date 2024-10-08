import { sequelize } from './sequelize.config';
import { defineAssociations, defineViews } from '../models';

export default class PostgreDB {
  private static instance: PostgreDB | null = null;


  public static async getInstance(): Promise<PostgreDB> {
    if (!PostgreDB.instance) {
      PostgreDB.instance = new PostgreDB();
      await PostgreDB.instance.connect();
      defineAssociations();
    }
    return PostgreDB.instance;
  }


  private async connect(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log('Conected to PostgreSQL with Sequelize');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
      throw err;
    }
  }

  public async sync(): Promise<void> {
    try {
      defineViews();
      await sequelize.sync({ alter: true });
    } catch (err) {
      console.error('Unable to sync the database:', err);
      throw err;
    }
  }

  public async isConnected(): Promise<boolean> {
    try {
      await sequelize.authenticate();
      return true;
    } catch {
      return false;
    }
  }

  public async close(): Promise<void> {
    try {
      await sequelize.close();
      PostgreDB.instance = null;
      console.log('Connection to PostgreSQL closed');
    } catch (err) {
      console.error('Error closing the connection:', err);
      throw err;
    }
  }
}