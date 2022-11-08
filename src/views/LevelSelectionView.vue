<template>
<div id="level-wrapper">
  <div class="container h-100">
    <div class="row mt-5 mb-5">
        <h1 class="text-center text-white">{{ $t('Select a Level') }}</h1>
    </div>
    <div class="row">
        <div class="col-4 mb-4" v-for="level in levels" :key="level.id">
            <div :class="level.locked ? 'btn btn-secondary level shadow-lg w-100 d-flex h-100 justify-content-center' : 'btn btn-primary level shadow-lg w-100 d-flex h-100 justify-content-center'" @click="openLevel(level)">
                <div v-if="!level.locked">
                    <h2>{{ level.id }}</h2>
                    <h3>{{ $t(level.name) }}</h3>
                    <div class="stars mb-2">
                        <i :class="level.stars > 0 ? 'fas fa-star fa-3x filled' : 'fas fa-star fa-3x'"></i>
                        <i :class="level.stars > 1 ? 'fas fa-star fa-4x filled' : 'fas fa-star fa-4x'"></i>
                        <i :class="level.stars > 2 ? 'fas fa-star fa-3x filled' : 'fas fa-star fa-3x'"></i>
                    </div>
                </div>
                <div class="align-self-center" v-else>
                    <i class="fas fa-lock fa-5x"></i>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex';


export default {
 name: "LevelSelectionView",
 mounted() {
  document.getElementById("app").classList.add('level');
 },
 computed: {
    ...mapGetters([
        'levels'
    ])
 },
 methods: {
    openLevel(level) {
        if (level.locked) {
            return;
        }
        this.$router.push(level.url);
    }
 }
}
</script>

<style scoped>

h1 {
    font-size: 100px;
}

.level {
    color: white;
    border: solid 3px white;
    min-height: 250px;
}

.level h2 {
    font-size: 80px;
    margin: 0;
}

.stars .filled {
    color: #ffd700;
}
</style>