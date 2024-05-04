import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/schemas/Customer.schema';
import { Bid, BidSchema } from 'src/schemas/Bid.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name : Bid.name, schema: BidSchema },
    ])
  ],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
