<template>
  <div class="progress" style="height: 5px;">
    <div class="progress-bar" :style="progress"></div>
    </div>
</template>

<script>
export default {
    name: 'LevelProgress',
    props: {
        step: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    computed: {
        progress() {
            const percent = this.$props.step / this.$props.max * 100;
            return "width: " + parseInt(percent) + "%";
        }
    }
}
</script>