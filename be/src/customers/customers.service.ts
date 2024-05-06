import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/schemas/Customer.schema';
import { CreateBidDto } from './dtos/CreateBid.dto';
import { Bid } from 'src/schemas/Bid.schema';
import { Localhost } from 'src/schemas/Localhost.schema';
import { RoomRequests } from 'src/schemas/RoomRequests.schema';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
        @InjectModel(Bid.name) private bidModel: Model<Bid>,
        @InjectModel('Localhost') private localhostModel: Model<Localhost>,
        @InjectModel('RoomRequests') private roomRequestModel: Model<RoomRequests>,
    ) {}

    async createBid(createBidDto: CreateBidDto) {
        const customer = await this.customerModel.findOne({ email: createBidDto.email }).exec();

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

        if (savedBid) {
            const localhosts = await this.localhostModel.find({
                city: createBidDto.city,
                code_verified: true,
            }).exec();
            const requestsPromises = localhosts.map(localhost =>
                this.roomRequestModel.create({
                    bid: savedBid._id,
                    localhost: localhost._id
                })
              );
              await Promise.all(requestsPromises);

            return savedBid;
        }

        return null;
        
    }
}
