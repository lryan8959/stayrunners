import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    localhost: string;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Object)
    images: File[];

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    available: boolean;

    @IsNotEmpty()
    paymentOptions: string[];

    @IsNotEmpty()
    minPricePerNight: number;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    billing: string;
}