<template>
  <Layout>
    <img v-bind:src="$page.post.imageUrl" alt="Post Image" v-if="$page.post.imageUrl" style="width: 100%; margin-bottom: -1rem;">

    <post-header v-bind:post="$page.post"></post-header>

    <section class="pad">
      <div v-html="$page.post.content" />
    </section>  
  </Layout>
</template>

<page-query>
query ($path: String!) {
  post(path: $path) {
    title
    excerpt
    content
    timeToRead
    updatedOn
    imageUrl
  }
}
</page-query>


<script>
import PostHeader from "~/components/PostHeader.vue"

export default {
  metaInfo: {
      title: this.$page.post.title,
      meta: [
        {key: "description", name: "description", content: this.$page.post.excerpt}
      ]
  },

  components: {
    PostHeader
  }
}
</script>