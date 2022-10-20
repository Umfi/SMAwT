<template>
<div>
    <div class="alert alert-primary" role="alert">
        None or multiple answers could be true.
    </div>

    <div class="card">
        <div class="card-header">
            <h2 class="text-center">{{ question }}</h2>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-6 mb-3" v-for="answer in mixedAnswers" :key="answer.id">
                    <input type="checkbox" class="btn-check" :id="answer.id" :value="answer.id" autocomplete="off" v-model="checkedItems">
                    <label class="btn btn-outline-primary w-100" :for="answer.id">{{ answer.text }}</label>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "QuizGame",
    props: {
        question: {
            type: String,
            required: true
        },
        answers: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            mixedAnswers: [],
            checkedItems: []
        };
    },
    mounted() {
        this.mixedAnswers = this.$props.answers.sort(() => Math.random() - 0.5);
    },
    methods: {
        check() {
            const correctAnswers = this.$props.answers.filter(answer => answer.correct).map(answer => answer.id).sort();
            const checkAnswers = this.checkedItems.sort();

            var is_same = (correctAnswers.length == checkAnswers.length) && correctAnswers.every(function(element, index) {
                return element === checkAnswers[index]; 
            });

            if (is_same) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}
</script>

<style>

</style>