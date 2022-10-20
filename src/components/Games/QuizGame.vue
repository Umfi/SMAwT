<template>
<div>
    <div class="alert alert-primary" role="alert">
        None or multiple answers could be true.
    </div>

    <div class="card">
        <div class="card-header">
            <h2>{{ question }}</h2>
        </div>
        <div class="card-body">
            <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <div v-for="answer in answers" :key="answer.id" class="me-3"> 
                    <input type="checkbox" class="btn-check" :id="answer.id" :value="answer.id" autocomplete="off" v-model="checkedItems">
                    <label class="btn btn-outline-primary" :for="answer.id">{{ answer.text }}</label>
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
            checkedItems: []
        };
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