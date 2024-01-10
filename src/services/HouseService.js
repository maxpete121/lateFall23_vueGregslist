import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { House } from "../models/House"

class HouseService{

    async getHouses(){
        const response = await api.get('api/houses')
        let allHouses = response.data.map(house => new House(house))
        console.log(allHouses)
        AppState.houses = allHouses
    }

    async createHouse(houseData){
        const response = await api.post('api/houses', houseData)
        let newHouse = new House(response.data)
        AppState.houses.push(newHouse)
    }

    async deletePost(houseID){
        const response = await api.delete(`api/houses/${houseID}`)
        let houseIndex = await AppState.houses.findIndex(house => house.houseId = houseID)
        AppState.houses.splice(houseIndex-1, 1)
    }
}

export const houseService = new HouseService()