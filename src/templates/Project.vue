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
  metaInfo() {
    const title = this.$page.project.title;

    const description = this.$page.project.excerpt;

    const image = this.$page.project.imageUrl != "" ? this.$page.project.imageUrl : '/insidert-post-banner.png';

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