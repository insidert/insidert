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
        publishedOn
      }
    }
  }
}
</page-query>

<script>
import PageHead from "~/components/PageHead.vue";
import PostsList from "~/components/PostsList.vue";

export default {
  components: {
    PostsList,
    PageHead
  }  
}
</script>