import express from 'express';
import cors from 'cors';
import { PORT, API_VERSION, CORS_ORIGIN, SYNC_DB } from './environment';
import { errorHandler } from '../middlewares/error.middleware';
import PostgreDB from './db';
import authRoutes from '../routes/auth.routes';
import userRoutes from '../routes/user.routes';
import guestRoutes from '../routes/guest.routes';
import eventRoutes from '../routes/event.routes';
import utilsRoutes from '../routes/utils.routes';
import subscriptiontypeRoutes from '../routes/subscriptiontype.routes';
import invitationRoutes from '../routes/invitation.routes';
import templateRoutes from '../routes/template.routes';

export default class Server {
  public app: express.Application;
  private server: any;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
    this.errorHandler();
    this.listen();
  }

  private async database() {
    const db = await PostgreDB.getInstance();
    if (SYNC_DB === 1) {
      try {
        await db.sync();
        console.log('Database synchronized successfully.');
      } catch (err) {
        console.error('Unable to sync the database:', err);
      }
    }
  }

  private middlewares() {
    this.app.use(cors({ origin: CORS_ORIGIN }));
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
  }

  private routes() {
    this.app.use(`/${API_VERSION}/auth`, authRoutes);
    this.app.use(`/${API_VERSION}/user`, userRoutes);
    this.app.use(`/${API_VERSION}/event`, eventRoutes);
    this.app.use(`/${API_VERSION}/guest`, guestRoutes);
    this.app.use(`/${API_VERSION}/subscriptiontype`, subscriptiontypeRoutes);
    this.app.use(`/${API_VERSION}/invitation`, invitationRoutes);
    this.app.use(`/${API_VERSION}/utils`, utilsRoutes);
    this.app.use(`/${API_VERSION}/template`, templateRoutes);
  }

  private errorHandler() {
    this.app.use(errorHandler);
  }

  private listen() {
    this.server = this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  public close() {
    this.server.close();
  }
}
