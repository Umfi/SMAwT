<template>
<div class="card w-50 m-auto">
    <div class="card-header">
        <h5 class="card-title">New Unread Message</h5>
    </div>
    <div class="card-body">
        <ul>
            <li v-for="message in messages" :key="message.id" :class="message.sender">{{ message.text }}</li>
        </ul> 
    </div>
</div>
</template>

<script>
export default {
  name: 'SimpleChat',
  props: ['messages']
}
</script>
<style scoped>
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}

ul li{
  display:inline-block;
  clear: both;
  padding: 20px;
  border-radius: 30px;
  margin-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
}

.other{
  background: #eee;
  float: left;
}

.me{
  float: right;
  background: #0084ff;
  color: #fff;
}

.other + .me{
  border-bottom-right-radius: 5px;
}

.me + .me{
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.me:last-of-type {
  border-bottom-right-radius: 30px;
}
</style>