<template>
  <Layout>
    <img v-bind:src="$page.post.imageUrl" alt="Post Image" v-if="$page.post.imageUrl" style="width: 100%; margin-bottom: -1rem;">

    <post-header v-bind:post="$page.post"></post-header>

    <section class="pad" id="post-content">
      <div v-html="$page.post.content" />

      <div style="margin-top: 3rem;">
        <h3 class="mb-0">Tags:</h3>
        <p v-for="tag in $page.post.tags" v-bind:key="tag.title" class="mb-0 mt-0">
          <a v-bind:href="tag.path">#{{ tag.title }}</a>
        </p>
      </div>      
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
    tags {
      id
      title
      path
    }
  }
}
</page-query>


<script>
import PostHeader from "~/components/PostHeader.vue"

export default {
  metaInfo() {
    const title = this.$page.post.title;

    const description = this.$page.post.excerpt;

    const image = this.$page.post.imageUrl != "" ? this.$page.post.imageUrl : '/insidert-post-banner.png';

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