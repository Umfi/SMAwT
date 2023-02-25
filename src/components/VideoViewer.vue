<template>
<div>
    <div class="ratio ratio-16x9">
        <video autoplay controls disablePictureInPicture controlsList="nodownload noremoteplayback noplaybackrate">
            <source :src="require('@/assets/' + path)" :type="type">
            Your browser does not support the video tag.
        </video>
    </div>
</div>
</template>

<script>
export default {
    name: "VideoViewer",
    props: {
        path: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            videoDone: false
        };
    },
    mounted() {
        this.videoDone = false;
        setTimeout(() => {
            this.videoDone = true;
        }, 1000 * 60);
    },
    methods: {
        check() {
            return this.videoDone;
        },
    },
}
</script>