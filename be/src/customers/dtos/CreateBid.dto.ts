import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateBidDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    email: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    @IsNumber()
    beds: number;

    @IsNotEmpty()
    @IsNumber()
    people: number;

    @IsNotEmpty()
    @IsNumber()
    nights: number;

    @IsNotEmpty()
    @IsNumber()
    priceWillingToPay: number;

    @IsNotEmpty()
    @IsString()
    specialInstructions: string;
}