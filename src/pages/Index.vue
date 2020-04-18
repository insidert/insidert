<template>
  <Layout>
    <nav class="nav">
      <g-image src="~/assets/images/raviteja.png" height="128" width="128" />
      <h1 class="mb-0">Inside Ravi Teja</h1>
      <p class="mt-0">Hello! welcome to my website, I am co-founder of Prasanta Communications and a full-stack developer.
      </p>
      <p>I write about <g-link to="/projects">my projects</g-link>, thoughts and important updates here. You can also <g-link to="/find-me">find me</g-link> on other social platforms and read my technical writings at <a href="https://coderbootcamp.in">Coder Bootcamp.</a></p>


    </nav>

    <section class="pad">
      <h3>Latest Posts</h3>
      <posts-list v-bind:posts="$page.posts.edges"></posts-list>

      <g-link to="/posts">View more posts</g-link>
    </section>

    <footer>
      <g-image src="~/assets/images/insidert.png" />
      <p>Made with Gridsome, hosted with Netlify.</p>
    </footer>

  </Layout>
</template>

<page-query>
query {
  posts: allPost(sortBy: "publishedOn", order: DESC, limit:5) {
    edges {
      node {
        id
        title
        excerpt
        publishedOn
        path
      }
    }
  }
}
</page-query>

<script>
import PostsList from "~/components/PostsList.vue";

export default {
  metaInfo: {
    title: 'Hello, world!'
  },

  components: {
    PostsList
  }
}
</script>

