<template>
  <div class="card w-75 m-auto">
    <div class="card-header bg-primary text-white">
      <h3>Your Profile</h3>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label for="name" class="form-label">First Name</label>
        <input type="text" class="form-control" id="name" v-model="fname" />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="name" v-model="lname" />
      </div>
      <div class="mb-3">
        <label for="dob" class="form-label">Birthday</label>
        <input type="text" class="form-control" id="dob" v-model="dob" />
      </div>
      <div class="mb-3">
        <label for="city" class="form-label">City</label>
        <input type="text" class="form-control" id="city" v-model="city" />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="address"
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input type="number" class="form-control" id="phone" v-model="phone" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileSetup",
  data() {
    return {
      fname: "",
      lname: "",
      dob: "",
      city: "",
      address: "",
      phone: "",
    };
  },
  methods: {
    check() {
      if (this.fname.trim().length == 0) {
        return  {
            status: 0,
            message: "Sharing your first name is not problematic.\n\nGo ahead and fix it."
        }
      }

      if (this.lname.trim().length > 1) {
        return  {
            status: 0,
            message: "It's not recommend to share your last name. If you really want to share it, better share only the first letter of it.\n\nGo ahead and fix it."
        }
      }

      if (this.dob.length > 0) {
        return  {
            status: 0,
            message: "Do you really want to tell everyone how old you are?.\n\nGo ahead and fix it."
        }
      }

      if (this.address.length > 0) {

         return  {
            status: 0,
            message: "You should never share your address online.\nStrangers should never know where you live!\n\nGo ahead and fix it."
        }
      }

      if (this.phone.length > 0) {

         return  {
            status: 0,
            message: "Never share such private inforamtion like your phone number online!\n\nGo ahead and fix it."
        }
      }

       return  {
            status: 1,
        }
    },
  },
};
</script>

<style>
</style>