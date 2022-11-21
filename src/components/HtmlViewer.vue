<script>

import Vue from 'vue/dist/vue.esm.js'

export default {
    name: "HtmlViewer",
    props: {
        path: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            html: "",
            template: null
        };
    },
    render: function(createElement) {
        if (!this.template) {
            return createElement('div', 'Loading...');
        } else {
            return this.template();
        }
    },
    mounted() {
        this.html = require('../assets/' + this.$props.path);

        setTimeout(() => {
            const res = Vue.compile(this.html.default);
            this.template = res.render;

             // staticRenderFns belong into $options, 
            // appearantly
            this.$options.staticRenderFns = []
            
            // clean the cache of static elements
            // this is a cache with the results from the staticRenderFns
            this._staticTrees = []
            
            // Fill it with the new staticRenderFns
            for (var i in res.staticRenderFns) {
            //staticRenderFns.push(res.staticRenderFns[i]);
            this.$options.staticRenderFns.push(res.staticRenderFns[i])
            }

        }, 100);
    },
}
</script>