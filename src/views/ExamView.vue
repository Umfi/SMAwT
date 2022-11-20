<template>
  <div>
    <h1>Exam</h1>

    <div v-if="examUnlocked">
        <p>TODO</p>
    </div>
    <div v-else>
        <p>Exam is not unlocked yet.</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'ExamView',
    computed: {
        ...mapGetters([
            'examUnlocked'
        ])
    },
}
</script>