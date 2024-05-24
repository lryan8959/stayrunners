import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/schemas/Room.schema';
import { CreateRoomDto } from './dtos/CreateRoom.dto';

@Injectable()
export class RoomsService {
    constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

    async createRoom(id, filenames, createRoomDto: CreateRoomDto) {
        createRoomDto.localhost = id;
        createRoomDto.pic_urls = filenames;

        const newRoom = new this.roomModel(createRoomDto);
        return await newRoom.save();
    }

    async getLocalhostRooms(id) {
        const rooms = this.roomModel.find({ localhost: id }).populate('city');
        return rooms;
    }
}
