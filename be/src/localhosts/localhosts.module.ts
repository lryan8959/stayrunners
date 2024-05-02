import { Module } from '@nestjs/common';
import { LocalhostsService } from './localhosts.service';
import { LocalhostsController } from './localhosts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Localhost, LocalhostSchema } from 'src/schemas/Localhost.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Localhost.name, schema: LocalhostSchema }
    ]),
  ],
  providers: [LocalhostsService],
  controllers: [LocalhostsController]
})
export class LocalhostsModule {}
