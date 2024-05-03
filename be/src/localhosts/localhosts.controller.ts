import { Body, Controller, Get, HttpException, Param, Patch, Post, Res } from '@nestjs/common';
import { LocalhostsService } from './localhosts.service';
import { CreateLocalhostDto } from './dtos/CreateLocalhost.dto';
import { Response } from 'express';
import { VerifyLocalhostDto } from './dtos/VerifyLocalhost.dto';
import mongoose from 'mongoose';

@Controller('localhosts')
export class LocalhostsController {
    constructor(private localhostsService: LocalhostsService) {}

    @Post()
    async createLocalhost(@Body() createLocalhostDto: CreateLocalhostDto, @Res() res: Response) {
        const localhost = await this.localhostsService.createLocalhost(createLocalhostDto);
        if (localhost === 'Email already exists') {
            throw new HttpException('Email already exists', 400);
        } else if (localhost) {
            return res.status(201).json(localhost);
        } else {
            throw new HttpException('Internal server error', 500);
        }
    }

    @Patch('/verify/:id')
    async verifyLocalhost(@Param('id') id: string, @Body() verifyLocalhostDto: VerifyLocalhostDto, @Res() res: Response) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Local does not exist', 400);
        const verified = await this.localhostsService.verifyLocalhost(id, verifyLocalhostDto);
        if (verified === 'Verification code is incorrect') {
            throw new HttpException('Verification code is incorrect', 400);
        } else if (verified === 'Local does not exist') {
            throw new HttpException('Local does not exist', 400);
        } else if (verified === 'Code already verified') {
            throw new HttpException('Code already verified', 400);
        } else if (verified === 'Verification code has expired') {
            throw new HttpException('Verification code has expired', 400);
        } else if (verified) {
            return res.status(200).json(verified);
        } else {
            throw new HttpException('Internal server error', 500);
        }
    }

    @Get('/resend-verification-code/:id')
    async resendVerificationCode(@Param('id') id: string, @Res() res: Response) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Local does not exist', 400);
        const resent = await this.localhostsService.resendVerificationCode(id);
        if (resent === 'Local does not exist') {
            throw new HttpException('Local does not exist', 400);
        } else if (resent === 'Code already verified') {
            throw new HttpException('Code already verified', 400);
        } else if (resent) {
            return res.status(200).json(resent);
        } else {
            throw new HttpException('Internal server error', 500);
        }
    }
}
