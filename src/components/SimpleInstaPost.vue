<template>
    <div class="post border">
      <div class="post__top">
        <img
          class="user__avatar post__avatar img-fluid rounded-circle"
          width="40"
          :src="author.avatar"
        />
        <div class="post__topInfo w-100">
          <h3 class="mt-3">{{ author.name }}</h3>
        </div>
        <div class="post__report w-100">
          <button :class="interactive ? 'btn btn-outline float-end dropdown-toggle' : 'disabled border-0 btn btn-outline float-end dropdown-toggle'" type="button" data-bs-toggle="dropdown" aria-expanded="false">
           <i class="fas fa-ellipsis-vertical"></i>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" @click="report"><i class="far fa-flag me-1"></i> {{ $t('Report post')}}</a></li>
          </ul>
        </div>
      </div>

      <div class="post__bottom">
        <img :src="require('@/assets/' + image)" class="img-fluid w-100 post_img" />
      </div>
      <div class="post__options pb-2">
        <div class="post__option like" @click="like">
          <i :class="isLiked ? 'fas text-danger fa-heart fs-4' : 'far fa-heart fs-4'"></i>
        </div>

        <div class="post__option comment">
          <i class="far fa-comment me-2 fs-4 "></i>
        </div>

        <div class="post__option share">
          <i class="far fa-paper-plane fs-4"></i>
        </div>
        <div class="post__option nohover">
        </div>
        <div class="post__option nohover">
        </div>
        <div class="post__option nohover">
        </div>
        <div class="post__option nohover">
        </div>
        <div class="post__option nohover">
        </div>
        <div class="post__option nohover">
        </div>
        <div class="post__option save">
          <i class="far fa-bookmark fs-4"></i>
        </div>
      </div>
      <div class="post__options pt-0">
        <p class="m-0 pb-2 msg w-100 px-2">
          <b>{{ $t('likes', { x: likes}) }}</b>
          <br>
          <b>{{ author.name }}</b> {{ $t(message) }}</p>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'SimpleInstaPost',
  props: {
    author: {
        default: null,
        type: Object
    },
    message: {
        default: '',
        type: String
    },
    image: {
        default: '',
        type: String
    },
    interactive: {
        default: false,
        type: Boolean
    },
  },
  data() {
    return {
      likes: Math.floor(Math.random() * 100),
      isLiked: false,
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    like() {
      if (!this.$props.interactive) {
        return;
      }

      if (this.isLiked) {
        this.isLiked = false;
        this.likes--;
      } else {
        this.isLiked = true;
        this.likes++;
      }

      this.$emit('liked', {post: this.$props.id, state: this.isLiked});
    },
    report() {
      this.$emit('reported');
    },
  }
}
</script>
<style scoped>

.dropdown-toggle::after {
  display: none;
}

.likes {
  padding-left: 15px;
  margin-bottom: -15px;
}

.post {
    width: 100%;
    margin-top: 15px;
    background-color: white;
    box-shadow: 0px 5px 7px -7px rgba(0,0,0,0.75);
}

.post__top {
    display: flex;
    position: relative;
    align-items: center;
    padding: 15px;
    padding-bottom: 0;
    padding-top: 5px;
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
    margin-bottom: 0px;
    padding: 0;
}


.post__image > img {
    width: 100%;
}

.post_img {
  max-height: 400px;
}
.post__options {
    padding-top: 10px;
    display: flex;
    justify-content: space-evenly;
    font-size: medium;
    color: black;
    cursor: pointer;
    padding: 15px;
}

.msg {
  color: grey;
}

.msg b {
  color: black;
}
.post__option:hover {
    background-color: #eff2f5;
    border-radius: 10px;
}

.post__option.nohover {
    cursor: default;
}
.post__option.nohover:hover {
    background-color: rgba(0,0,0,0);
    border-radius: 0px;
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

.post__option.active {
  background-color: #0d6efd;
  border-radius: 10px;
  color: #fff;
}

.post__comments {
    padding-top: 10px;
    border-top: 1px solid lightgrey;
    justify-content: space-evenly;
    font-size: medium;
    color: gray;
    padding: 15px;
}

.user__avatar_comment {
  height: 35px;
  width: 35px;
}

</style>