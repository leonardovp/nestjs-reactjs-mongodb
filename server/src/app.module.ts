import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

//const password = process.env.MONGO_CLUSTER_PASSWORD;
const password  = 'VjkvwGGVstSPVS3l';
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://leonardovp:${password}@clustermongodb.ev4yfws.mongodb.net/crud-nest-react-users`),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}


