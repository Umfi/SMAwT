<template>
    <div class="container text-center border pb-2">
        <div class="row">
            <div class="col">
                <img v-if="user"
                    :src="user.avatar"
                    class="rounded-circle mt-2"
                    width="50"
                    height="50"
                />
                <img v-if="avatar"
                    :src="avatar"
                    class="rounded-circle mt-2"
                    width="50"
                    height="50"
                />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                    <h5 v-if="user">{{ user.name }}</h5>
                    <h5 v-if="name">{{ name }}</h5>
                    </div>
                </div>
                <div class="row" v-if="mutal > 0">
                    <div class="col">
                    <p class="card-text">{{ mutal }} {{ $t('mutal friends') }}</p>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                    <button type="button" class="btn btn-primary mb-2 w-100" @click="confirm">{{ $t('Confirm') }}</button>
                    <button type="button" class="btn btn-light btn-outline-secondary w-100" @click="reject">{{ $t('Delete') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SimpleFriendRequest",
    props: {
        user: {
            type: Object,
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        mutal: {
            default: 0,
            type: Number,
        },
    },
    methods: {
        confirm() {
            this.$emit("confirm");
        },
        reject() {
            this.$emit("reject");
        },
    },
}
</script>
