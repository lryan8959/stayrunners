import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Localhost } from 'src/schemas/Localhost.schema';
import { CreateLocalhostDto } from './dtos/CreateLocalhost.dto';
import { VerifyLocalhostDto } from './dtos/VerifyLocalhost.dto';
import { hashPassword } from 'src/utils/bcrypt';
import { generatePassword } from 'src/utils/generatePassword';

@Injectable()
export class LocalhostsService {
    constructor(@InjectModel(Localhost.name) private localhostModel: Model<Localhost>) {}

    async createLocalhost(createLocalhostDto: CreateLocalhostDto) {
        const email = createLocalhostDto.email;
        const findByEmail = await this.localhostModel.findOne({ email }).exec();
        if (findByEmail && findByEmail.code_verified) {
            return 'Email already exists';
        }

        if (findByEmail && !findByEmail.code_verified) {
            const verificationcode = Math.floor(100000 + Math.random() * 900000);
            findByEmail.verification_code = verificationcode;
            findByEmail.verification_code_created_at = new Date();
            await findByEmail.save();
            return { _id: findByEmail._id, code_verified: false };
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

    async verifyLocalhost(id, verifyLocalhostDto: VerifyLocalhostDto) {
        const { verification_code } = verifyLocalhostDto;
        const localhost = await this.localhostModel.findById(id).exec();

        if (!localhost) {
            return 'Local does not exist';
        }
        if (localhost.code_verified) {
            return 'Code already verified';
        }

        if (localhost.verification_code !== verification_code) {
            return 'Verification code is incorrect';
        }

        const currentTime = new Date();
        const expirationTimeInMinutes = 100;
        const expirationTime = new Date(localhost.verification_code_created_at.getTime() + expirationTimeInMinutes * 60000);

        if (currentTime > expirationTime) {
            return 'Verification code has expired';
        }

        const password = generatePassword();
        const hashedPassword = hashPassword(password);

        localhost.code_verified = true;
        localhost.code_verified_at = new Date();
        localhost.password = hashedPassword;
        await localhost.save();
        return { _id: localhost._id, code_verified: true, password };
        
    }

    async resendVerificationCode (id) {
        const localhost = await this.localhostModel.findById(id).exec();
        if (!localhost) {
            return 'Local does not exist';
        }
        if (localhost?.code_verified) {
            return 'Code already verified';
        }
        const verificationcode = Math.floor(100000 + Math.random() * 900000);
        localhost.verification_code = verificationcode;
        localhost.verification_code_created_at = new Date();
        await localhost.save();
        return { _id: localhost._id, code_verified: false };
    }
}
