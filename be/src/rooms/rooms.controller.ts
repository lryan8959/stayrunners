import { Body, Controller, HttpStatus, Post, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateRoomDto } from './dtos/CreateRoom.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { FileInterceptor, FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + '-' + Date.now();
                const extension: string = path.parse(file.originalname).ext;

                cb(null, `${filename}${extension}`);
            }
        })
    }))
    async uploadFile(@Req() req: Request, @Body() createRoomDto: CreateRoomDto, @Res() res, @UploadedFile() file) {
        const id: any = (req.user as any).id;
        const room = await this.roomsService.createRoom(id, file.filename, createRoomDto);
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
