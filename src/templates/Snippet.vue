<template>
  <Layout>
    <img v-bind:src="$page.snippet.imageUrl" alt="Post Image" v-if="$page.snippet.imageUrl" style="width: 100%; margin-bottom: -1rem;">

    <post-header v-bind:post="$page.snippet"></post-header>

    <section class="pad">
      <div v-html="$page.snippet.content" />
    </section>  
  </Layout>
</template>

<page-query>
query ($path: String!) {
  snippet(path: $path) {
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
  metaInfo() {
    const title = this.$page.snippet.title;

    const description = this.$page.snippet.excerpt;

    const image = this.$page.snippet.imageUrl != "" ? this.$page.snippet.imageUrl : '/insidert-post-banner.png';

    const url = "https://insidert.com" + this.$route.fullPath;

    return {
      title: title,
      meta: [
        {
          key: "description", 
          name: "description", 
          content: description
        },
        {
          key: "og:type",
          name: "og:type",
          content: "website"
        },
        {
          key: "og:url",
          name: "og:url",
          content: url
        },
        {
          key: "og:title",
          name: "og:title",
          content: title
        },
        {
          key: "og:description",
          name: "og:description",
          content: description
        },
        {
          key: "og:image",
          name: "og:image",
          content: image
        },
      ]
    }
  },


  components: {
    PostHeader
  }
}
</script>