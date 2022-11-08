<template>
  <div class="container mt-5">
    
    <div class="row">
      <div class="col-8 text-center m-auto ">
            
            <div class="card">
              <div class="card-header">
                <h1>{{ $t('Create your user') }}</h1>
              </div>
              <div class="card-body">
                <div class="avatar">
                  <avataaars 
                    :isCircle="isCircle" 
                    :facialHairType="'blank'" 
                    :mouthType="mouths[Math.floor(Math.random()* mouths.length)]" 
                    eyebrowType="DefaultNatural"
                    accessoriesType="Blank"
                    v-if="refreshAvatar" 
                    ref="avatar"
                  ></avataaars>
                  <button type="button" class="btn btn-secondary" @click="changeAvatar">
                    <i class="fas fa-random"></i>
                  </button>
                </div>

                <input type="text" class="form-control mt-4 w-50 m-auto" id="name" :placeholder="$t('Enter your name')" v-model="username">
              </div>
              <div class="card-footer">
                <button type="button" class="btn btn-primary btn-lg mt-4" @click="start" :disabled="username.length == 0"> {{ $t('Start') }}</button>
              </div>
            </div>  
      </div>
    </div>
  </div>
</template>

<script>
import Avataaars from 'vuejs-avataaars'

export default {
  name: 'SetupView',
  components: {
    Avataaars
  },
  data() {
    return {
      refreshAvatar: true,
      isCircle: true,
      username: '',
      mouths: ['Default', 'Eating', 'Grimace', 'Serious', 'Smile', 'Tongue', 'Twinkle'],
    }
  },
  methods: {
    changeAvatar() {
      this.refreshAvatar = false;
      this.$nextTick(() => {
          this.refreshAvatar = true;
      });
    },
    start() {
      const user = {
        name: this.username,
        avatar: `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.$refs.avatar.$el.outerHTML)))}`
      }

      this.isCircle = false;

      this.$nextTick(() => {
        user.image = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.$refs.avatar.$el.outerHTML)))}`;
      
        this.$store.dispatch('startGame', user).then(() => {
          this.$router.push('/levels')
        });
      });
      

      
    }
  }
}
</script>
<style scoped>
.avatar {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  margin-bottom: 80px;
}
</style>
