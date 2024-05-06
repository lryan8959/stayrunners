import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/schemas/Room.schema';
import { CreateRoomDto } from './dtos/CreateRoom.dto';

@Injectable()
export class RoomsService {
    constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

    async createRoom(id, filename, createRoomDto: CreateRoomDto) {
        createRoomDto.localhost = id;
        createRoomDto.pic_url = filename;

        const newRoom = new this.roomModel(createRoomDto);
        return await newRoom.save();
    }
}
