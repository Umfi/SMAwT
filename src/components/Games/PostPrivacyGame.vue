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
        <div class="post__option public" @click="changePrivacy('public')">
          <i class="fas fa-earth-europe me-2"></i> Public
        </div>

        <div class="post__option friends" @click="changePrivacy('friends')">
          <i class="fas fa-user-group me-2"></i> Friends
        </div>

        <div class="post__option selected-friends" @click="changePrivacy('selected-friends')">
          <i class="fas fa-user me-2"></i> Selected Friends
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PostPrivacyGame',
  props: {
    author: {
        default: '',
    },
    message: {
        default: '',
        type: String
    },
    answer: {
        default: '',
        type: String
    },
  },
  data() {
    return {
      privacy: '',
    }
  },
  methods: {
    changePrivacy(answer) {
      this.privacy = answer;

      Array.from(document.getElementsByClassName('post__option')).forEach((element) => {
        element.classList.remove('active');
      });

      Array.from(document.getElementsByClassName('post__option ' + answer)).forEach((element) => {
        element.classList.add('active');
      });
    },
    checkAnswer() {
      if (this.privacy === "") {
        return -1;
      } else if (this.privacy === this.$props.answer) {
        return 1;
      } else {
        return 0;
      }
    }
  },
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

.post__option.active {
  background-color: rgba(var(--bs-primary-rgb),1)!important;
  color: white;
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