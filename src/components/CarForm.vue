<template>
  <form @submit.prevent="handleSubmit()" class="row p-3 bg-white rounded shadow">
    <div class="mb-3 col-3">
      <label for="car-make">Make</label>
      <input v-model="carData.make" class="form-control" type="text" minlength="3" maxlength="20" required name="car-make" id="car-make">
    </div>
    <div class="mb-3 col-3">
      <label for="car-model">Model</label>
      <input v-model="carData.model" class="form-control" type="text" minlength="3" maxlength="20" required name="car-model" id="car-model">
    </div>
    <div class="mb-3 col-3">
      <label for="car-year">year</label>
      <input v-model="carData.year" class="form-control" type="text" minlength="3" maxlength="20" required name="car-year" id="car-year">
    </div>
    <div class="mb-3 col-3">
      <label for="car-price">Price {{ carData.price }}</label>
      <input v-model="carData.price" class="form-range" value="5000" type="range" min="1" max="1000000" required name="car-price" id="car-price">
    </div>
    <div class="mb-3 col-8">
      <label for="car-picture">Picture of Car</label>
      <input v-model="carData.imgUrl" class="form-control" type="url"  required name="car-picture" id="car-picture">
    </div>
    <div class="col-4 p-3">
      <img v-if="carData.imgUrl" :src="carData.imgUrl" class="img-fluid" alt="">
      <div v-else class="place-holder"> preview of car image</div>
    </div>
    <div class="col-12 mb-3">
      <label for="car-description">Description of Car</label>
      <textarea v-model="carData.description" name="car-description" id="car-description" class="form-control" rows="3"></textarea>
    </div>
    <div class="col-6 mb-3">
      <label for="car-color">Color</label>
      <input v-model="carData.color" type="color" name="car-color" id="car-color" class="form-control">
    </div>
    <div class="col-6 mb-3">
      <label for="car-engine">Type of Engine</label>
      <select v-model="carData.engineType" name="car-engine" id="car-engine" class="form-control" required>
        <!-- <option value="v6">V6</option>
        <option value="v8">V8</option>
        <option value="v10">V10</option> -->
        <option value="" selected disabled>please select an engine type</option>
        <option class="text-capitalize" v-for="engine in engineTypes" :value="engine">{{ engine }}</option>
      </select>
    </div>

    <div class="mb-2 d-flex justify-content-end">
      <button class="btn" type="button" @click="resetForm">cancel</button>
      <button v-if="!editCarData" class="btn btn-primary">Create Car <i class="mdi mdi-plus"></i></button>
      <button v-else class="btn btn-success">Edit Car <i class="mdi mdi-pencil"></i></button>
    </div>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted, watch } from 'vue';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js';
import { Car } from '../models/Car.js';
export default {
  //NOTE the form now has an optional prop, so we can re-use it to edit a car instead
  // If you pass in a car's information, it will trigger the watch, and the watch will set the prop information, to the form information
  props: {editCarData: {type: Car}},
  setup(props){
    // const carMake = ref('') instead of capturing each value individually we can capture them all with a ref
    const carData = ref({engineType: ''})
    function resetForm(){
      carData.value = {engineType: ''}
    }
    watch(props, ()=>{
      setEditData()
    })
    function setEditData(){
      carData.value = props.editCarData
    }
  return {
    // carMake,
    carData,
    engineTypes: ['unknown', 'v6', 'v8', 'v10', 'chuncko', '4 cylinder', '2 stroke', 'small', 'medium', 'large'],
    resetForm,
    async handleSubmit(){
      // check if there is an edit occurring or a create occurring
      // NOTE if your form does not need to create AND edit, just ignore this handle submit function, have your submit, just run the create function directly
      if(props.editCarData){
        this.updateCar()
      } else {
        this.createCar()
      }
    },
    async createCar(){
      try {
        console.log('⭐🚗', carData.value);
        await carsService.createCar(carData.value)
        Pop.success('created Car!😎')
        // carData.value = {engineType: ''} // to reset the form, just set the carData.value back to what it started at.
        resetForm()
      } catch (error) {
        Pop.error(error)
      }
    },
    async updateCar(){
      try {
        await carsService.updateCar(carData.value)
        Pop.success('Updated Car!😎')
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>
.place-holder{
  height: 10vh;
  border: 2px var(--bs-info) dashed;
}
</style>
