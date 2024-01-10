import { Profile} from './Profile.js'


export class Car{
  constructor(data){
    this.id = data.id
    this.make = data.make
    this.model = data.model
    this.year = data.year
    this.price = data.price
    this.imgUrl = data.imgUrl
    this.description = data.description
    this.color = data.color
    this.engineType = data.engineType
    this.creatorId = data.creatorId
    this.creator = new Profile(data.creator)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }


}

/**
 * make: String, required
model: String, required
imgUrl: String, required
year: Number, required
price: Number, required
description: String,
color: String,
engineType: String,
creatorId: String (References Account Id), required
*creator: Object (Virtual Added by Database)
*createdAt: ISO Timestamp (Virtual Added by Database)
*updatedAt: ISO Timestamp (Virtual Added by Database)
 */
