import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from './schemas/country.schema';
import { Model } from 'mongoose';
import { CreateCountryDto } from './dtos/CreateCountry.dto';

@Injectable()
export class CountriesService {
    constructor(@InjectModel(Country.name) private countryModel: Model<Country>) {}

    async createCountry (createCountryDto: CreateCountryDto) {
        const createdCountry = new this.countryModel(createCountryDto);
        return createdCountry.save();
    }
}
