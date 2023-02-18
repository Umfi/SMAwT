<template>
    <div class="post border">
      <div class="post__top">
        <img
          class="user__avatar post__avatar img-fluid rounded-circle"
          width="50"
          :src="author.avatar"
        />
        <div class="post__topInfo w-100">
          <h3>{{ author.name }}</h3>
        </div>
        <div class="post__report w-100">
          <button :class="interactive ? 'btn btn-outline float-end dropdown-toggle' : 'disabled border-0 btn btn-outline float-end dropdown-toggle'" type="button" data-bs-toggle="dropdown" aria-expanded="false">
           <i class="fas fa-ellipsis"></i>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" @click="report"><i class="far fa-flag me-1"></i> {{ $t('Report post')}}</a></li>
          </ul>
        </div>
      </div>

      <div class="post__bottom">
        <p class="m-0 px-3 pb-2">{{ $t(message) }}</p>
        <img v-if="image.length > 0" :src="require('@/assets/' + image)" class="img-fluid pb-2 w-100 post_img" />
      </div>
    <div class="px-3 py-1 news-container" v-if="link.length > 0 && headline.length > 0">
      <span class="news-url">{{ link }}</span>
      <br>
      <b class="news-titel">{{ $t(headline) }}</b>
    </div>

      <div class="row mb-2">
        <div class="col-6 text-black-50" v-show="likes > 0 || comments.length > 0 || shares > 0">
          <i class="bg-primary fs-6 fas fa-thumbs-up p-2 rounded-5 text-white ms-3"></i> {{ likes}}
        </div>
        <div class="col-6 align-self-center text-end text-black-50" v-show="comments.length > 0 || shares > 0">
          <span class="me-2">{{ comments.length }} {{ $t('comments') }}</span> 
          <span class="me-3">{{ shares }} {{ $t('shares') }}</span>
        </div>
      </div>
      <div class="post__options">
        <div :class="isLiked ? 'post__option like active' : 'post__option like'" @click="like">
          <i class="far fa-thumbs-up me-2"></i> {{ $t('Like') }}
        </div>

        <div class="post__option comment" @click="showCommentBox">
          <i class="far fa-comment me-2"></i> {{ $t('Comment') }}
        </div>

        <div class="post__option share">
          <i class="far fa-paper-plane me-2"></i> {{ $t('Share') }}
        </div>
      </div>
      <div class="post__comments" v-show="showComments">

        <div class="w-100">
          <div class="d-flex w-100 mb-2" v-for="comment in comments" :key="comment.text">
            <img
              class="user__avatar_comment post__avatar img-fluid rounded-circle border"
              :src="comment.user.avatar"
            />
            <div class="w-100 bg-light rounded-3">
              <b class="mx-2">{{ comment.user.name }}</b>
              <p class="mx-2">{{ $t(comment.text) }}</p>
            </div>
            <div>
              <button type="button" class="btn btn-outline border-0 float-end dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-ellipsis"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click="reportComment(comment.id)"><i class="far fa-flag me-1"></i> {{ $t('Report comment') }}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="d-flex w-100">
          <img
            class="user__avatar post__avatar img-fluid rounded-circle"
            width="30"
            :src="user.avatar"
          />
          <textarea class="form-control" :placeholder="$t('Write a comment...')" rows="1" v-model="commentText" @keydown.enter.prevent="comment"></textarea>
        </div>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'SimplePost',
  props: {
    id: {
      type: Number,
      default: 1,
    },
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
    link: {
        default: '',
        type: String
    },
    headline: {
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
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false,
      showComments: false,
      commentText: '',
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
    showCommentBox() {
      if (!this.$props.interactive) {
        return;
      }

      if (this.showComments) {
        this.showComments = false;
      } else {
        this.showComments = true;
      }
    },
    comment() {

      // random picture api
      //https://avatars.dicebear.com/api/avataaars/53.png

      const comment = {
        id: this.comments.length + 1,
        user: this.user,
        text: this.commentText
      };

      this.comments.push(comment);

      this.$emit('commented', {post: this.$props.id, comment: comment});

      this.commentText = "";
    },
    report() {
      this.$emit('reported');
    },
    reportComment(id) {
      this.comments = this.comments.filter(fr => fr.id != id);
      this.$emit('comment-reported', {post: this.$props.id, comment: id});
    },
    addLikes(number) {
      this.likes += number;
    },
    addComment(user, text) {
      const comment = {
        id: this.comments.length + 1,
        user: user,
        text: text
      };

      this.comments.push(comment);
    }
  }
}
</script>
<style scoped>

.news-container {
    margin-bottom: -0.5rem!important;
    margin-top: -0.5rem !important;
    background-color: #F0F2F5;
}

.news-url {
  font-size: .8125rem;
  font-weight: 400;
  color: #65676B;
}

.dropdown-toggle::after {
  display: none;
}

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
    padding-bottom: 0;
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