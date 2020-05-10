<template>
  <Layout>
    
    <page-head title="Posts" description="Sorted by latest first."></page-head>

    <section class="pad">
      <posts-list v-bind:posts="$page.posts.edges"></posts-list>
    </section>
  </Layout>
</template>

<page-query>
query {
  posts: allPost(sortBy: "updatedOn", order: DESC) {
    edges {
      node {
        id
        title
        excerpt
        path
        updatedOn
      }
    }
  }
}
</page-query>

<script>
import PageHead from "~/components/PageHead.vue";
import PostsList from "~/components/PostsList.vue";

export default {
  metaInfo() {
    const title = "Posts from Ravi Teja";

    const description = "Writings of Ravi Teja.";

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
          content: "https://insidert.com/posts"
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
          content: "/insidert-banner.png"
        },
      ]
    }
  },

  components: {
    PostsList,
    PageHead
  }  
}
</script>