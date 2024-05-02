import { IsNotEmpty, IsString } from "class-validator";

export class CreateCountryDto {
    @IsString()
    @IsNotEmpty()
    country_name: string;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsString()
    @IsNotEmpty()
    language: string;
}