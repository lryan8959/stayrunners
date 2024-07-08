import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    //MODAL NAME
    return `This action returns all user`;
  }
  //get token from params and find customer infomations from db
  async findOne(bitId: any, userRole: any) {
    console.log('id------>', bitId);
    const customerBid = await this.bidModel.findOne({ _id: bitId }).exec();

    console.log('db data---->', customerBid);

    const customerID = customerBid.customer.toString();
    console.log('db id---->', customerID);
    const customerData = await this.customerModel
      .findOne({ _id: customerID })
      .exec();
    console.log('customerData', customerData);
    return { customerData ,userRole};
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
