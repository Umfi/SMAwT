<template>
  <div id="app" :class="'d-flex flex-column min-vh-100 min-vw-100 home'">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand">SMAwT</router-link> 

            <div class="text-center text-dark badge bg-warning fs-6" v-if="points > 0">
            <b>{{ points }} {{ $t('Points')}}</b>
            </div>

            <div class="float-end">
              <input type="file" id="uploadmyfile" @change="requestUploadFile" style="display: none;"/>
              <button type="button" class="btn btn-secondary me-2" @click="loadProgress" title="Spielstand laden">
                <i class="fa-solid fa-folder-open"></i>
              </button>

              <button type="button" class="btn btn-secondary" @click="saveProgress" title="Spielstand speichern">
                <i class="fa-solid fa-floppy-disk"></i>
              </button>
            </div>
        </div>
    </nav>

    <transition name="fade" mode="out-in">
        <router-view/>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      language: 'de'
    }
  },
  computed: {
    ...mapGetters([
        'points'
    ])
  },
  watch:{
    language: function (val) {
      this.$i18n.locale = val;
    }
  },
  methods: {
    loadProgress() {
      this.$el.querySelector('#uploadmyfile').click();
    },
    requestUploadFile() {
      var src = this.$el.querySelector('#uploadmyfile')

      var fileReader=new FileReader();

      fileReader.onload=function(){
        try {
          const data = JSON.parse(fileReader.result);
          localStorage.setItem('sometra_points', data.points);
          localStorage.setItem('sometra_user', data.user);
          localStorage.setItem('sometra_levels', data.levels);
          localStorage.setItem('sometra_preTest', data.preTestDone);

          window.location.reload();
        } catch (e) {
          alert('Fehler beim Laden der Datei');
          return;
        }
          
      }

      fileReader.readAsText(src.files[0]);
    },
    saveProgress() {
              const data =  {
            points: localStorage.getItem('sometra_points'),
            user: localStorage.getItem('sometra_user'),
            levels: localStorage.getItem('sometra_levels'),
            preTestDone: localStorage.getItem('sometra_preTest'),
        }

         const textToBLOB = new Blob([JSON.stringify(data)], { type: 'text/plain' });
         const sFileName = 'smawt.json';	

        let newLink = document.createElement("a");
        newLink.download = sFileName;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click(); 
    }
  }
}
</script>
<style>

#app {
    background: url('~@/assets/bg1.jpg') no-repeat center center fixed; 
    min-height: 100vh;
    background-size: cover
}

#app.level {
    background: url('~@/assets/bg.jpg') no-repeat center center fixed; 
    min-height: 100vh;
    background-size: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>