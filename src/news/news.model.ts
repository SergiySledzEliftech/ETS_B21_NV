import * as mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema({
	title: {type: String, required: true},
	desciption: {type: String, required: true},
	price: {type: Number, required: true},

});


export interface News {
	id: string,
	title: string,
	desc: string,
	price: number
}

