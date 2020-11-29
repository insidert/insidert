<template>
  <section>
    <div v-for="post in posts" v-bind:key="post.id" style="margin-bottom: 4rem;">
      <small>{{ new Date(post.node.updatedOn).toDateString() }}</small>
      <h3 class="mt-0 mb-0"><a v-bind:href="post.node.path">{{ post.node.title }}</a></h3>
      <p class="mt-0 mb-0">{{ post.node.excerpt }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: ["posts"]
}
</script>