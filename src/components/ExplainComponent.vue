<template>
<div>
  <h1 class="text-center">{{ title}}</h1>

    <p class="lead">{{ description }}</p>
    <ul class="list-group">
        <li v-for="(item, index) in items" :key="index" class="list-group-item">
        {{ item.text }} <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(index)"><i class="fas fa-question"></i></button>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "ExplainComponent",
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        }
    },
    methods: {
        explain(index) {
            this.$emit("explain", this.$props.items[index].explanation);
        }
    }
}
</script>

<style>

</style>