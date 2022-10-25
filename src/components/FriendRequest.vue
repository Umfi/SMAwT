<template>
  <div class="card w-50 m-auto">
    <div class="card-header">
      <h5 class="card-title">Friend Request</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-4">
          <img
            :src="image"
            class="rounded-circle"
            width="100"
            height="100"
          />
        </div>
        <div class="col text-start">
          <div class="row">
            <div class="col">
              <h5>{{ name }}</h5>
            </div>
          </div>
          <div class="row" v-if="mutalFriends > 0">
            <div class="col">
              <p class="card-text">{{ mutalFriends }} mutal friends</p>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <button type="button" class="btn btn-primary me-2" style="width: 45%">Confirm</button>
              <button type="button" class="btn btn-light btn-outline-secondary" style="width: 45%">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FriendRequest',
  props: {
    image: {
        default: '',
        type: String
    },
    name: {
        default: '',
        type: String
    },
    mutalFriends: {
        default: 0,
        type: Number
    }
  }
}
</script>
<style scoped>
</style>