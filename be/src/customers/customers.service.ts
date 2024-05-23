import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/schemas/Customer.schema';
import { CreateBidDto } from './dtos/CreateBid.dto';
import { Bid } from 'src/schemas/Bid.schema';
import { Localhost } from 'src/schemas/Localhost.schema';
import { RoomRequests } from 'src/schemas/RoomRequests.schema';
import { EmailService } from 'src/utils/EmailService';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Bid.name) private bidModel: Model<Bid>,
    @InjectModel('Localhost') private localhostModel: Model<Localhost>,
    @InjectModel('RoomRequests') private roomRequestModel: Model<RoomRequests>,
    private emailService: EmailService,
  ) {}

  async createBid(createBidDto: CreateBidDto) {
    const customer = await this.customerModel
      .findOne({ email: createBidDto.email })
      .exec();

    let _id;
    let CustomerName;

    if (!customer) {
      const { name, city, email } = createBidDto;
      const createdCustomer = new this.customerModel({
        name,
        city,
        email,
      });
      const savedCustomer = await createdCustomer.save();
      _id = savedCustomer._id;
      CustomerName = savedCustomer.name;
    } else {
      _id = customer._id;
      CustomerName = customer.name;
    }

    const { beds, people, nights, price_willing_to_pay, special_instructions } =
      createBidDto;
    const createdBid = new this.bidModel({
      customer: _id,
      beds,
      people,
      nights,
      price_willing_to_pay,
      special_instructions,
    });
    const savedBid = await createdBid.save();

    if (savedBid) {
      const localhosts = await this.localhostModel
        .find({
          city: createBidDto.city,
          code_verified: true,
        })
        .exec();
      const requestsPromises = localhosts.map((localhost) =>
        this.roomRequestModel.create({
          bid: savedBid._id,
          localhost: localhost._id,
        }),
      );
      await Promise.all(requestsPromises);

      const emailsPromises = localhosts.map((localhost) =>
        this.emailService.sendEmail(
          localhost.email,
          'A New Room Request - Last Minute Booking',
          `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Room Request</title>
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>A New Room Request</h2>
                    <p>Hello,</p>
                    <p>A new room request has been received:</p>
                    <ul>
                        <li><strong>Name:</strong> ${CustomerName}</li>
                        <li><strong>City:</strong> {{city}}</li>
                        <li><strong>Beds:</strong> ${beds}</li>
                        <li><strong>People:</strong> ${people}</li>
                        <li><strong>Nights:</strong> ${nights}</li>
                        <li><strong>Special Instructions:</strong> ${special_instructions}</li>
                    </ul>
                    <a href="{{negotiateUrl}}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none;">Negotiate Room Stay</a>
                    <p>If you have any questions or concerns, please contact us.</p>
                    <p>Thank you!</p>
                </div>
            </body>
            </html>

          `,
        ),
      );
      await Promise.all(emailsPromises);

      await this.emailService.sendEmail(
        createBidDto.email,
        'Confirmation - Last Minute Booking',
        `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Confirmation</title>
          </head>
          <body>
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Confirmation</h2>
                  <p>Thank you,</p>
                  <p>this Email confirms that you will receive an email if a Room is Available.</p>
              </div>
          </body>
          </html>

        `
      );

      return savedBid;
    }

    return null;
  }
}
