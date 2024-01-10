
<template>
    <div class="">
      <img class="img-fluid img-card w-100 rounded-2" :src="houseProp.imgUrl" alt="">
      <span class="d-flex">
        <h5 class="me-2">Posted By:</h5>
        <h5 class="text-success">{{ houseProp.creator.name }}</h5>
      </span>
      <span class="d-flex">
        <h5 class="me-2">Price:</h5>
        <h5>{{ houseProp.price }}</h5>
      </span>
      <span class="d-flex">
        <h5 class="me-2">Bedrooms:</h5>
        <h5>{{ houseProp.bedrooms }}</h5>
      </span>
      <span class="d-flex">
        <h5 class="me-2">Bathrooms:</h5>
        <h5>{{ houseProp.bathrooms }}</h5>
      </span>
      <span class="d-flex">
        <h5 class="me-2">Levels:</h5>
        <h5>{{ houseProp.levels }}</h5>
      </span>
      <span class="d-flex">
        <h5 class="me-2">Year:</h5>
        <h5>{{ houseProp.year }}</h5>
      </span>
      <span class="">
        <h5 class="me-2">Description:</h5>
        <h5>{{ houseProp.description }}</h5>
      </span>
      <button class="me-2" v-if="houseProp.creatorId == accountId.id">Edit</button>
      <button v-if="houseProp.creatorId == accountId.id" @click="deletePost(houseProp.houseId)">Delete</button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
  import { House } from '../models/House'
  import {houseService} from '../services/HouseService.js'
  export default {
    props: {houseProp: {type: House, required: true}},
    setup() {
      async function deletePost(houseId){
        await houseService.deletePost(houseId)
      }
      return {
        accountId: computed(()=> AppState.account),
        deletePost,
      }
    }
  }
  </script>
  
  <style scoped>
  .img-card{
    height: 330px;
  }
</style>
  