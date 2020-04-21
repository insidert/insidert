<template>
  <Layout>
    <img v-bind:src="$page.project.imageUrl" alt="Post Image" v-if="$page.project.imageUrl" style="width: 100%; margin-bottom: -1rem;">

    <post-header v-bind:post="$page.project"></post-header>

    <section class="pad">
      <div v-html="$page.project.content" />
    </section>  
  </Layout>
</template>

<page-query>
query ($path: String!) {
  project(path: $path) {
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
    title: this.$page.project.title,
    meta: [
      {key: "description", name: "description", content: this.$page.project.excerpt}
    ]
  },

  components: {
    PostHeader
  }
}
</script>