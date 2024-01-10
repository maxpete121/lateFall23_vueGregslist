<template>
    <div class="car-card border border-primary rounded shadow">
      <!-- 🚗 {{ car.make }} -->
      <img :src="car.imgUrl" class="img-fluid rounded-top" :alt="`picture of ${car.make} ${car.model}`">
      <div class="p-1">
        <p class="fw-bold text-center"> {{ car.year }} {{ car.make }} {{ car.model }}</p>
        <p>{{ car.description }}</p>
        <div class="text-success text-end"><b>${{ car.price }}</b></div>
        <button @click="deleteCar(car.id)" v-if="account.id == car.creatorId" class="btn btn-danger delete-button" title="delete car"><i class="mdi mdi-delete-forever"></i></button>
        <button @click="setActiveCar()" v-if="account.id == car.creatorId" data-bs-toggle="modal" data-bs-target="#edit-car-modal" class="btn btn-warning edit-button"><i class="mdi mdi-pen"></i></button>
      </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Car } from '../models/Car.js';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js';
export default {
  props: {car: {type: Car, required: true}},
  setup(props){
  return {
    // REVIEW the reason we CAN'T use info from the AppState to display the SINGLE car data here, is cause this component doesn't know which car it's supposed to render
    // singleCar : computed(()=> AppState.cars)
    account: computed(()=> AppState.account),
    async deleteCar(carId){
      try {
        if(await Pop.confirm('Are you sure?')){
          // await carsService.deleteCar(props.car.id) another way to get the cars id, without having to use arguments and parameters, but using the props instead
          await carsService.deleteCar(carId)
          Pop.success('deleted car')
        }
      } catch (error) {
        Pop.error(error)
      }
    },
    setActiveCar(){
      carsService.setActiveCar(props.car.id)
    }
   }
  }
};
</script>


<style lang="scss" scoped>
.car-card{
  position: relative;
  img{
    width: 100%;
    height: 25vh;
    object-fit: cover;
    object-position: center;
  }
  .delete-button{
    position: absolute;
    right: 0px;
    top: 0px
  }
}
</style>
