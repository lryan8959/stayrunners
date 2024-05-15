import { Module } from '@nestjs/common';
import { LocalhostsService } from './localhosts.service';
import { LocalhostsController } from './localhosts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Localhost, LocalhostSchema } from 'src/schemas/Localhost.schema';
import {
  RoomRequests,
  RoomRequestsSchema,
} from 'src/schemas/RoomRequests.schema';
import { Room, RoomSchema } from 'src/schemas/Room.schema';
import { EmailService } from 'src/utils/EmailService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Localhost.name, schema: LocalhostSchema },
      { name: RoomRequests.name, schema: RoomRequestsSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  providers: [LocalhostsService, EmailService],
  controllers: [LocalhostsController],
})
export class LocalhostsModule {}
