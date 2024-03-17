import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const uri =
  'mongodb+srv://agentfx:agentfx@cluster0.mkakccn.mongodb.net/stock_portfolio?retryWrites=true&w=majority&appName=Cluster0'; // Adjust connection details

@Module({
  imports: [MongooseModule.forRoot(uri)],
})
export class DatabaseModule {}
