import { api } from "./AxiosService.js"
import { Car} from '../models/Car.js'
import {AppState} from '../AppState.js'

class CarsService {

  async getCars() {
    const response = await api.get('api/cars')
    console.log('📡🚗', response.data);
    AppState.cars = response.data.map(car => new Car(car))
  }

  async createCar(carData){
    const response = await api.post('api/cars', carData)
    console.log(('⭐📡🚗', response.data));
    AppState.cars.push(new Car(response.data))
  }

  async updateCar(updateCar){
    const response = await api.put(`api/cars/${updateCar.id}`, updateCar)
    const indexToUpdate = AppState.cars.findIndex(car => car.id == updateCar.id)
    AppState.cars.splice(indexToUpdate, 1, new Car(response.data))
  }

  async deleteCar(carId){
    const response = await api.delete(`api/cars/${carId}`)
    console.log('📡🚗💥', response.data);
    const indexToRemove = AppState.cars.findIndex(car => car.id == carId) // give me position of item im deleting
    AppState.cars.splice(indexToRemove,1)// remove the item from the array
  }

  setActiveCar(carId){
    const selectedCar = AppState.cars.find(car => car.id == carId)
    AppState.activeCar = selectedCar
  }

}

export const carsService = new CarsService()
