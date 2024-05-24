import { BadRequestException, Body, Controller, HttpStatus, Post, Get, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateRoomDto } from './dtos/CreateRoom.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images', 10, {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                console.log(file)
                const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + '-' + Date.now();
                const extension: string = path.parse(file.originalname).ext;

                cb(null, `${filename}${extension}`);
            }
        })
    }))
    async uploadFile(
        @Req() req: Request,
        @Body() createRoomDto: CreateRoomDto,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Res() res) {
        if (!files || files.length === 0) {
            throw new BadRequestException('At least one image is required');
        }
    
        const id: any = (req.user as any).id;
        const filenames = files.map(file => file.filename);
        const room = await this.roomsService.createRoom(id, filenames, createRoomDto);
        if (room) {
            return res.status(HttpStatus.CREATED).json({
                success: true,
                data: room
            });
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getLocalhostRooms(
        @Req() req: Request,
        @Res() res) {
    
        const id: any = (req.user as any).id;
        const rooms = await this.roomsService.getLocalhostRooms(id);
        if (rooms?.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Rooms not found'
            });
        } else if (rooms?.length > 0) {
            return res.status(200).json({
                success: true,
                data: rooms
            });
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

}
