<template>
<div>
    <div class="card">
        <div class="card-header">
            <h2 class="text-center">{{ $t(question) }}</h2>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-6 mb-3" v-for="answer in answers" :key="answer.id">
                    <input :type="mode == 'multiple' ? 'checkbox' : 'radio'" class="btn-check" :id="answer.id" :value="answer.id" autocomplete="off" v-model="checkedItems">
                    <label class="btn btn-outline-primary w-100 h-100 answer" :for="answer.id">{{ $t(answer.text) }}</label>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "InformationChat",
    props: {
        question: {
            type: String,
            required: true
        },
        answers: {
            type: Array,
            required: true
        },
        mode: {
            type: String,
            required: false,
            default: 'multiple'
        },
        store: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {
            checkedItems: []
        };
    },
    methods: {
        check() {
            if (this.$props.mode == 'multiple') {

                if (this.checkedItems.length == 0) {
                    return -1;
                }

                const ans = this.answers.filter(answer => answer.id == this.checkedItems[0]);
                const nextStep = ans[0].func;

                const ansTexts = this.checkedItems.map(id => this.answers.find(ans => ans.id === id))
                    .filter(ans => ans)
                    .map(ans => ans.text)
                    .join(', ');

                const payload = {
                    key: this.$props.question,
                    value: ansTexts
                }

                if (this.$props.store) {
                    this.$store.dispatch("updateUserData", payload);
                }
                return nextStep;
            } else {
                if (this.checkedItems == 0) {
                    return -1;
                }
                const ans = this.answers.filter(answer => answer.id == this.checkedItems)[0];
                const nextStep = ans.func;
                const ansText = ans.text;

                const payload = {
                    key: this.$props.question,
                    value: ansText
                }

                if (this.$props.store) {
                    this.$store.dispatch("updateUserData", payload);
                }

                return nextStep;
            }
        },
    },
    watch: {
        checkedItems: function (newVal) {
             if (this.$props.mode == 'multiple') {
                if (newVal.length > 0) {
                    this.$emit('ready');
                }
             } else {
                 this.$emit('ready');
             }
        },
    },
}
</script>