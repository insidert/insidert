<template>
  <Layout>
    <div class="links">
        <small><g-link to="/">Home</g-link></small>
        <small><g-link to="/posts">All Posts</g-link></small>
        <small><g-link to="/tags">Explore Tags</g-link></small>
      </div>

    <nav class="nav">
      <h1 class="mb-0 mt-0">Posts with <u>#{{ $page.tag.title }}</u> tag</h1>
    </nav>
  
    <div class="pad">
      <posts-list v-bind:posts="$page.tag.belongsTo.edges"></posts-list>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  tag (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on Post {
            id
            title
            updatedOn
            excerpt
            path
          }
        }
      }
    }
  }
}
</page-query>

<script>
import PostsList from "~/components/PostsList.vue";

export default {
  metaInfo() {
    return {
      title: this.$page.tag.title,
      meta: [{ name: "description", content: this.$page.tag.title + ' posts from Ravi Teja.' }]
    };
  },

  components: {
    PostsList
  },
}
</script>