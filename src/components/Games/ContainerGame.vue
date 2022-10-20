<template>
    <div>
        <div class="alert alert-primary" role="alert">
          Drag each item and move it into the "Good" or "Bad" box.
        </div>
        
        <div class="row">
          <div class="col">
            <h3 class="text-center">Good</h3>
            <draggable class="list-group good shadow" :list="goodList" group="items" @add="sound.play()">
              <div
                class="list-group-item"
                v-for="(element) in goodList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
          <div class="col">
            <h3 class="text-center">All</h3>
            <draggable class="list-group all shadow" :list="allList" group="items">
              <div
                class="list-group-item"
                v-for="(element) in allList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
          <div class="col">
            <h3 class="text-center">Bad</h3>
            <draggable class="list-group bad shadow" :list="badList" group="items" @add="sound.play()">
              <div
                class="list-group-item"
                v-for="(element) in badList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
        </div>
    </div>
</template>

<script>

import draggable from 'vuedraggable'

export default {
  name: "ContainerGame",
  components: { draggable },
  props: {
    items: [],
  },
  data() {
    return {
      sound: null,
      allList: [],
      goodList: [],
      badList: [],
    };
  },
  mounted() {
    this.sound = new Audio('/sounds/stick.wav');
    this.allList = this.$props.items;
    this.allList.sort(() => Math.random() - 0.5);
  },
  methods: {
    check() {
      if ( this.allList.length > 0) {
        return -1;
      }

      let newAll = [];

      this.goodList.forEach((item, index, arr) => {
        if (item.type === "bad") {
          newAll.push(item);
          arr.splice(index, 1);
        }
      });


      this.badList.forEach((item, index, arr) => {
        if (item.type === "good") {
          newAll.push(item);
          arr.splice(index, 1);
        }
      });

      this.allList = newAll;

      if ( this.allList.length > 0) {
        return 0;
      } else {
        return 1;
      }
    },
  },
};
</script>
<style scoped>
.list-group.good {
  background-color: #8cd69d;
  min-height: 500px;
  padding: 5px;
}

.list-group.bad {
  background-color: #e1505c;
  min-height: 500px;
  padding: 5px;
}

.list-group.all {
  background-color: #969393;
  min-height: 500px;
  padding: 5px;
}
</style>