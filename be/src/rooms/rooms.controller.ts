import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateRoomDto } from './dtos/CreateRoom.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('rooms')
export class RoomsController {
    @Post()
    @UseGuards(JwtAuthGuard)
    async createRoom(@Req() req: Request, @Body() createRoomDto: CreateRoomDto, @Res() res: Response) {
        console.log(req.user);
        return 'Room created';
    }
}
