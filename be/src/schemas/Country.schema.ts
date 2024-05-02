import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Country {
    @Prop({ required: true })
    country_name: string;

    @Prop({ required: true })
    currency: string;

    @Prop({ required: true })
    language: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);