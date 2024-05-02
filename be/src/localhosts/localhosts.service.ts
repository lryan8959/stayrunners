import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Localhost } from 'src/schemas/Localhost.schema';
import { CreateLocalhostDto } from './dtos/CreateLocalhost.dto';

@Injectable()
export class LocalhostsService {
    constructor(@InjectModel(Localhost.name) private localhostModel: Model<Localhost>) {}

    async createLocalhost(createLocalhostDto: CreateLocalhostDto) {
        const email = createLocalhostDto.email;
        const findByEmail = await this.localhostModel.findOne({ email }).exec();
        console.log(findByEmail);
        if (findByEmail) {
            return 'Email already exists';
        }
        const verificationcode = Math.floor(100000 + Math.random() * 900000);
        createLocalhostDto.verification_code = verificationcode;
        // verification code send to local host's email
        const createdLocalhost = new this.localhostModel(createLocalhostDto);
        const savedUser = await createdLocalhost.save();
        const { _id, code_verified} = savedUser;
        if (savedUser) {
            return { _id, code_verified };
        }
    }
}
