<template>
    <div>
    <div class="container pb-2 text-center" v-if="network">
        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-dark animate__animated animate__pulse animate__delay-2s animate__repeat-3" data-bs-toggle="modal" data-bs-target="#networkModal">
                    {{ $t('Show friendship network')}}
                </button>
            </div>
        </div>
    </div>
    <div class="modal fade" id="networkModal" tabindex="-1" aria-hidden="true" v-if="network">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ $t('Friendship network')}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img :src="require('../assets/' + network)" class="network"/>
            </div>
            </div>
        </div>
    </div>
    <div class="container text-center border pb-2 card shadow-sm">
        <div class="row">
            <div class="col">
                <img v-if="user"
                    :src="user.avatar"
                    class="rounded-circle mt-2"
                    width="50"
                    height="50"
                />
                <img v-if="avatar"
                    :src="require('../assets/' + avatar)"
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
                <div class="row mt-2" v-if="showButtons">
                    <div class="col">
                    <button type="button" class="btn btn-primary mb-2 w-100" @click="confirm">{{ $t('Confirm') }}</button>
                    <button type="button" class="btn btn-light btn-outline-secondary w-100" @click="reject">{{ $t('Delete') }}</button>
                    </div>
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
        network: {
            type: String,
        },
        showButtons: {
            default: false,
            type: Boolean,
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
<style scoped>
.network {
    width:100%;
}
</style>