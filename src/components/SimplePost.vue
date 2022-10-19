<template>
    <div class="post border">
      <div class="post__top">
        <img
          class="user__avatar post__avatar img-fluid rounded-circle"
          width="50"
          :src="author.avatar"
        />
        <div class="post__topInfo">
          <h3>{{ author.name }}</h3>
        </div>
      </div>

      <div class="post__bottom">
        <p>{{ message }}</p>
      </div>

      <div class="post__options">
        <div class="post__option">
          <span class="material-symbols-outlined me-2"> thumb_up</span> Like
        </div>

        <div class="post__option">
          <span class="material-symbols-outlined me-2"> chat_bubble_outline</span> Comment
        </div>

        <div class="post__option">
          <span class="material-symbols-outlined me-2"> near_me </span> Share
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SimplePost',
  props: {
    author: {
        default: null,
        type: Object
    },
    message: {
        default: '',
        type: String
    },
  }
}
</script>
<style scoped>

.post {
    width: 100%;
    margin-top: 15px;
    border-radius: 15px;
    background-color: white;
    box-shadow: 0px 5px 7px -7px rgba(0,0,0,0.75);
}

.post__top {
    display: flex;
    position: relative;
    align-items: center;
    padding: 15px;
}

.post__avatar {
    margin-right: 10px;
}

.post__topInfo > h3{
    font-size: medium;
}

.post__topInfo > p {
    font-size: small;
    color: gray;
}

.post__bottom {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 15px 25px;
}

.post__image > img {
    width: 100%;
}

.post__options {
    padding-top: 10px;
    border-top: 1px solid lightgrey;
    display: flex;
    justify-content: space-evenly;
    font-size: medium;
    color: gray;
    cursor: pointer;
    padding: 15px;
}

.post__option:hover {
    background-color: #eff2f5;
    border-radius: 10px;
}

.post__option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    flex: 1;
}

.post__option > p {
    margin-left: 10px;
}


</style>