import mongoose, { Document, Schema } from "mongoose";

export interface IData extends Document {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
}

const DataSchema: Schema = new Schema({
  id: { type: String, required: true },
  nama: { type: String, required: true },
  email: { type: String, required: true },
  telepon: { type: String, required: true },
  alamat: { type: String, required: true },
});

export const Data = mongoose.model<IData>("Data", DataSchema);
