import { MongoClient, Db, Collection } from 'mongodb';
import { IPInfoDto } from './ip_info.dto';

export const collections: { ipInfo?: Collection<IPInfoDto> } = {};

class DbClient {
  private db: Db; 

  async connect(): Promise<void> {
    const {
      MONGODB_USER,
      MONGODB_PASSWORD,
      MONGODB_HOST,
      MONGODB_DOCKER_PORT,
      MONGODB_DATABASE
    } = process.env;
    let client: MongoClient = new MongoClient(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/?authSource=admin`)
    client = await client.connect();
    this.db = client.db(MONGODB_DATABASE);
  }

  async createCollections(): Promise<void> {
    let collection: Collection<IPInfoDto> = this.db.collection<IPInfoDto>(process.env.MONGO_COLLECTION);
    if (!collection) {
      collection = await this.db.createCollection<IPInfoDto>(process.env.MONGO_COLLECTION);       
    }
    collections.ipInfo = collection;
  }
}

export default new DbClient();
