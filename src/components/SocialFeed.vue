<template>
    <div class="border shadow socialFeed">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Fakebook</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item">
                <input type="text" class="form-control" :placeholder="$t('Search')" aria-label="Search" :disabled="!interactive">
                </li>
                <li class="nav-item dropdown ms-4">
                <button type="button" :class="interactive ? 'btn btn-light dropdown-toggle position-relative fr-btn' : 'disabled btn btn-light dropdown-toggle position-relative fr-btn'" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user-plus"></i>
                    <span v-show="friendRequests.length > 0" class="position-absolute top-0 mt-1 start-100 translate-middle badge rounded-pill bg-danger">
                        {{friendRequests.length }}
                    </span>
                </button>
                <ul class="dropdown-menu p-0" aria-labelledby="navbarDropdown">
                    <li v-for="fr in friendRequests" :key="fr.id">
                        <simple-friend-request :user="fr.user" :mutal="fr.mutal" @confirm="confirmFriendRequest(fr.id)" @reject="rejectFriendRequest(fr.id)"></simple-friend-request>
                    </li>

                    <li v-if="friendRequests.length == 0"><span class="p-2">{{ $t('No friend requests') }}</span></li>
                </ul>
                </li>
                <li class="nav-item ms-4">
                    <img :src="user.avatar" class="img-fluid rounded-circle" width="35" />
                </li>
            </ul>
            </div>
        </div>
        </nav>
        <div class="container bg-light py-2 feed">
            <div class="row">
                <div class="col-8 m-auto">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <textarea class="form-control create-post-content" rows="3" :placeholder="$t('What\'s on your mind?')" v-model="text" :disabled="!interactive"></textarea>
                            
                            <button :class="interactive ? 'btn btn-outline border-0 dropdown-toggle float-start create-post-visibility' : 'disabled create-post-visibility btn btn-outline border-0 dropdown-toggle float-start'" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i :class="'fas ' + visibilityOfPostStyle"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" @click="changeVisibility('public')"><i class="fas fas fa-earth-europe me-1"></i> {{ $t('Public') }}</a></li>
                                <li><a class="dropdown-item" href="#" @click="changeVisibility('friends')"><i class="fas fas fa-user-group me-1"></i> {{ $t('Friends') }}</a></li>
                                <li><a class="dropdown-item" href="#" @click="changeVisibility('selected_friends')"><i class="fas fas fa-user me-1"></i> {{ $t('Selected Friends') }}</a></li>
                            </ul>

                            <button type="button" class="btn btn-primary mt-2 float-end create-post-btn" @click="createPost" :disabled="!interactive">{{ $t('Create post') }}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-8 m-auto" v-for="post in posts.slice().reverse()" :key="post.message">
                <simple-post :ref="'posts'" :class="'post-' + post.id" :id="post.id" :author="post.author" :message="post.message" :image="post.image" :interactive="interactive" @reported="report(post.id)" @comment-reported="reportComment" @liked="like" @commented="comment"></simple-post>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SimplePost from './SimplePost.vue';
import SimpleFriendRequest from './SimpleFriendRequest.vue';

import {mapGetters} from 'vuex';

export default {
    name: "SocialFeed",
    components: {
        SimplePost,
        SimpleFriendRequest
    },
    data() {
        return {
            interactive: true,
            text: '',
            visibilityOfPost: 'public',
            posts: [],
            friendRequests: [],
        }
    },
    methods: {
        createPost(user = null, message = null, image = null, visibility = null) {

            let post;

            if (message === null && visibility === null) {
                post = {
                    id: this.posts.length + 1,
                    author: this.user,
                    message: this.text,
                    image: '',
                    privacy: this.visibilityOfPost
                }

                this.$emit('post', post);
            } else {
                post = {
                    id: this.posts.length + 1,
                    author: user,
                    message: message,
                    image: image,
                    privacy: visibility
                }
            }
            

            this.posts.push(post);
            this.text = '';

            return post;
        },
        changeVisibility(newVisibility) {
            this.visibilityOfPost = newVisibility;
            this.$emit('post-visbility', newVisibility);
        },
        createFriendRequest(user, mutal) {
            const friendRequest = {
                id: this.friendRequests.length + 1,
                user: user,
                mutal: mutal
            }

            this.friendRequests.push(friendRequest);

            return friendRequest.id;
        },
        confirmFriendRequest(id) {
            this.friendRequests = this.friendRequests.filter(fr => fr.id != id);
            this.$emit('friend-request', {id: id, status: 'confirmed'});
        },
        rejectFriendRequest(id) {
            this.friendRequests = this.friendRequests.filter(fr => fr.id != id);
            this.$emit('friend-request', {id: id, status: 'rejected'});
        },
        report(id) {
            console.log("report post: " + id);
        },
        reportComment({post, comment}) {
            this.$emit('report-comment', {post: post, comment: comment});
        },
        like(data) {
            this.$emit('post-like', {post: data.post, state: data.state});
        },
        comment(data) {
            this.$emit('post-comment', {post: data.post, comment: data.comment});
        },
        setInteractive(interactive) {
            this.interactive = interactive;
        }
    },
    computed: {
        ...mapGetters([
            'user'
        ]),
        visibilityOfPostStyle() {
            if (this.visibilityOfPost === 'public') {
                return 'fa-globe-europe';
            } else if (this.visibilityOfPost === 'friends') {
                return 'fa-user-group';
            } else if (this.visibilityOfPost === 'selected_friends') {
                return 'fa-user';
            }

            return 'fa-globe-europe';
        }
  },
}
</script>

<style scoped>
.feed {
    max-height: 80vh;
    min-height: 80vh;
    padding-bottom: 250px !important;
    overflow-y: scroll;
}

#navbarDropdown::after{
    display: none;
}

.socialFeed {
    margin-top: -30px;
}

</style>