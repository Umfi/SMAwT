<template>
    <div class="content">
        <img :src="require('@/assets/' + image)" class="img" />
        <div class="clock-coutdown">
          <span>{{ time }}</span>
          </div>
        <div class="snap-text" :style="'top:' + position + 'px'">
          <span class="txt_snap-text">{{ $t(message) }}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SimpleSnapPost',
  props: {
    message: {
        default: '',
        type: String
    },
    image: {
        default: '',
        type: String
    },
    position: {
        default: 280,
        type: Number
    },
  },
  data() {
    return {
      time: Math.floor(Math.random() * 10) + 1,
    }
  },
}
</script>
<style scoped>
.content {
    position: relative;
    width: 390px;
    display: table;
    height: 600px;
}

.img {
    max-height: 600px;
    max-width: 390px;
    min-height: 600px;
    width: 100%;
    height: auto;
    vertical-align: middle;
    border-style: none;
}

.clock-coutdown {
    background: rgba(0,0,0,.6);
    border-radius: 3px;
    color: #fff;
    font-size: 17px;
    height: 35px;
    margin-left: 0;
    margin-top: 5px;
    opacity: .9;
    padding: 5px;
    position: absolute;
    right: 6px;
    text-align: center;
    top: 0;
    width: auto;
    min-width: 35px;
}

.snap-text {
    background-color: rgba(0,0,0,.6);
    color: #fff;
    margin-left: 0;
    min-height: 25px;
    overflow: visible;
    padding-bottom: 0;
    position: absolute;
    width: 100%;
}

.txt_snap-text {
    color: #fff;
    display: block;
    font-size: 15px;
    padding: 6px 0 8px;
    text-align: center;
}
</style>