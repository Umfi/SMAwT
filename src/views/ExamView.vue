<template>
  <div>
    <div v-if="examUnlocked" class="container">
        <div v-if="!showCertificate" class="mt-3 row">
            <div class="col-12 mt-2 mb-2">
                <div class="card w-75 m-auto">
                    <div class="card-header bg-dark">
                        {{ $t("Dein Profil") }}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-5"></div>
                            <div class="col-4">
                                <img :src="user.avatar" class="img-fluid" width="100" alt="Avatar">
                            </div>
                        </div>
                        <div>
                            <b>Name</b> 
                            <p>{{ user.name ? user.name : "Nicht angegeben" }}</p>
                            <hr>
                        </div>
                        <div>
                            <b>Alter</b> 
                            <p>{{ user.data.age ? user.data.age : "Nicht angegeben" }}</p>
                            <hr>
                        </div>
                        <div>
                            <b>Geschlecht</b> 
                            <p>{{ user.data.gender ? user.data.gender : "Nicht angegeben" }}</p>
                            <hr>
                        </div>
                        <div>
                            <b>E-Mail</b> 
                            <p>{{ user.data.email ? user.data.email : "Nicht angegeben" }}</p>
                            <hr>
                        </div>
                        <div>
                            <b>Adresse</b> 
                            <p>{{ user.data.address ? user.data.address : "Nicht angegeben" }}</p>
                            <hr>
                        </div>
                        <div v-for="interview in user.data.interviewData" :key="interview.key">
                            <b>{{ interview.key }}</b> 
                            <p>{{ interview.value }}</p>
                            <hr>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary w-100 btn-lg" @click="showCertificate = true">{{ $t("Abschlusszertifikat anzeigen") }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <exam-certificate :points="points"></exam-certificate>
        </div>
    </div>
    <div v-else>
        <p>Result is not unlocked yet.</p>
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
            showCertificate: false,
        };
    },
    computed: {
        ...mapGetters([
            'examUnlocked',
            'points',
            'user'
        ])
    },
}
</script>