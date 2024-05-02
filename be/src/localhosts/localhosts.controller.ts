import { Body, Controller, HttpException, Post, Res } from '@nestjs/common';
import { LocalhostsService } from './localhosts.service';
import { CreateLocalhostDto } from './dtos/CreateLocalhost.dto';
import { Response } from 'express';

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
}
