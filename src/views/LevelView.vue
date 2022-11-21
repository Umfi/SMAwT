<template>
  <base-level 
  v-if="gameData"
  :level_id="gameData.level_id" 
  :level_name="gameData.level_name" 
  :level_data="gameData"
  ref="base">
  </base-level>
</template>

<script>
import BaseLevel from '../components/BaseLevel.vue'
import {mapGetters} from 'vuex';

export default {
  components: {BaseLevel },
  name: 'LevelView',
  data() {
    return {
      gameData: null
    }
  },
 computed: {
    ...mapGetters([
        'levels',
    ])
 },
  mounted() {
    document.getElementById("app").classList.remove('level');

    const levelId = this.$route.params.id;

    if (levelId) {
        
        const level = this.levels.find(l => l.id == levelId);

        if (level) {
            if (level.locked) {
                this.$router.push('/levels');
                return;
            } else {
                try {
                    this.gameData = require('../assets/levels/' + levelId + '/data.json');
                } catch (_) {
                    this.$router.replace("/levels");
                    return;
                }
        
                setTimeout(() => {
                    this.$refs.base.nextMove();
                }, 500);
            }
        } else {
            this.$router.push('/levels');
        }
    }
  },
}
</script>