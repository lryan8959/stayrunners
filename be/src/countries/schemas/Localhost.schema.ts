import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { City } from "./City.schema";

@Schema()
export class Localhost {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true }) // Assuming email is unique for each local host
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
    city: City;

    @Prop()
    verification_code: string;

    @Prop()
    verification_code_created_at: Date;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;
}

export const LocalhostSchema = SchemaFactory.createForClass(Localhost);