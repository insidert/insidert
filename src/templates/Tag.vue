<template>
  <Layout>
    <nav class="nav">
       <div class="flex-between">
        <small><g-link to="/">Home</g-link></small>
        <small><g-link to="/posts">All Posts</g-link></small>
        <small><g-link to="/tags">Explore Tags</g-link></small>
      </div>
      <h1 class="mb-0">Posts with <u>#{{ tag }}</u> tag</h1>
    </nav>
  
    <div class="pad">
      <posts-list v-bind:posts="$page.posts.edges"></posts-list>
    </div>
  </Layout>
</template>

<page-query>
query Posts ($title: String!) {
  posts: allPost(filter: { tags: { contains: [$title] }}, sortBy: "updatedOn", order: DESC) {
    edges {
      node {
        id
        title
        excerpt
        path
        updatedOn
        tags {
          id
          title
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
      title: this.tag,
      meta: [{ name: "description", content: 'Posts from Ravi Teja with ' + this.tag + ' tag.' }]
    };
  },

  data() {
    return {
      tag: ''
    }
  },

  components: {
    PostsList
  },

  mounted() {
    const pageParams = location.href.split("tags/");
    
    this.tag = pageParams[1].replace("/", "");
  }
}
</script>