<template>
    <div>
        <div class="alert alert-primary" role="alert">
          Drag each term and move it to the "Good" and "Bad" section
        </div>
        
        <div class="row">
          <div class="col">
            <h3>All</h3>
            <draggable class="list-group shadow" :list="allList" group="items">
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
            <h3>Good</h3>
            <draggable class="list-group good shadow" :list="goodList" group="items">
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
            <h3>Bad</h3>
            <draggable class="list-group bad shadow" :list="badList" group="items">
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
      allList: [],
      goodList: [],
      badList: [],
    };
  },
  mounted() {
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
</style>