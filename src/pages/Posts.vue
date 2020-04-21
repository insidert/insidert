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
  posts: allPost {
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
  metaInfo: {
    title: "Posts from Ravi Teja",
    meta: [
      {key: "description", name: "description", content: "Writings of Ravi Teja."}
    ]
  },

  components: {
    PostsList,
    PageHead
  }  
}
</script>