import { Body, Controller, HttpException, Post, Res } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateBidDto } from './dtos/CreateBid.dto';
import { Response } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post('/create-bid')
  async createBid(@Body() createBidDto: CreateBidDto, @Res() res: Response) {
    const customer = await this.customersService.createBid(createBidDto);
    if (customer === null) {
      throw new HttpException('Invalid data', 400);
    } else if (customer) {
      return res.status(201).json({
        data: customer,
      });
    } else {
      throw new HttpException('Internal server error', 500);
    }
  }
}
