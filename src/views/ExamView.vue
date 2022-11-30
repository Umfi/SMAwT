<template>
  <div>
    <div v-if="examUnlocked">
        <div v-if="!examDone">
            TODO
        </div>
        <div v-else>
            <exam-certificate :points="55"></exam-certificate>
        </div>
    </div>
    <div v-else>
        <p>Exam is not unlocked yet.</p>
    </div>
  </div>
</template>

<script>
import ExamCertificate from '@/components/ExamCertificate.vue';
import {mapGetters} from 'vuex';

export default {
    components: { ExamCertificate },
    name: 'ExamView',
    data() {
        return {
            examDone: false,
        };
    },
    computed: {
        ...mapGetters([
            'examUnlocked'
        ])
    },
}
</script>