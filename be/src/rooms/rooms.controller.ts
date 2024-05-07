import { BadRequestException, Body, Controller, HttpStatus, Post, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
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

}
