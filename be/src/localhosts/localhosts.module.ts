import { Module } from '@nestjs/common';
import { LocalhostsService } from './localhosts.service';
import { LocalhostsController } from './localhosts.controller';

@Module({
  providers: [LocalhostsService],
  controllers: [LocalhostsController]
})
export class LocalhostsModule {}
