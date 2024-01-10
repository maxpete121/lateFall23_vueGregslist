import { api } from "./AxiosService.js"
import { Car} from '../models/Car.js'
import {AppState} from '../AppState.js'

class CarsService {

  async getCars() {
    const response = await api.get('api/cars')
    console.log('📡🚗', response.data);
    AppState.cars = response.data.map(car => new Car(car))
  }

}

export const carsService = new CarsService()
