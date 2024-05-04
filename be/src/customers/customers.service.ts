import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/schemas/Customer.schema';
import { CreateBidDto } from './dtos/CreateBid.dto';
import { Bid } from 'src/schemas/Bid.schema';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
        @InjectModel(Bid.name) private bidModel: Model<Bid>,
    ) {}

    async createBid(createBidDto: CreateBidDto) {
        const customer = await this.customerModel.findOne({ email: createBidDto.email }).exec();
        console.log(customer)

        let _id;

        if (!customer) {
            const { name, city, email } = createBidDto;
            const createdCustomer = new this.customerModel({
                name, city, email
            });
            const savedCustomer = await createdCustomer.save();
            _id = savedCustomer._id;
        } else {
            _id = customer._id;
        }
        
        const { beds, people, nights, priceWillingToPay, specialInstructions } = createBidDto;
        const createdBid = new this.bidModel({
            customer: _id, beds, people, nights, priceWillingToPay, specialInstructions
        });
        const savedBid = await createdBid.save();
        if (!savedBid) {
            return null;
        }
        return savedBid;
    }
}
