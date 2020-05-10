<template>
  <Layout>
    <nav class="nav">
      <g-image src="~/assets/images/raviteja.png" height="128" width="128" />
      <h1 class="mb-0">Inside Ravi Teja</h1>
      <p class="mt-0">Hello! welcome to my website, I am co-founder of <g-link to="/prasanta-communications">
        Prasanta Communications
      </g-link> and a full-stack developer.
      </p>
      <p>I write about <g-link to="/projects">my projects</g-link>, thoughts and important updates here. You can also <g-link to="/find-me">find me</g-link> on other social platforms. I am also writing and maintaining <a href="https://coderbootcamp.in">Coder Bootcamp</a>.</p>


    </nav>

    <section class="pad">
      <h3>Latest Posts</h3>
      <posts-list v-bind:posts="$page.posts.edges"></posts-list>

      <g-link to="/posts">View more posts</g-link>
    </section>

    <footer>
      <g-image src="~/assets/images/insidert.png" width="256"/>
      <p class="mb-0">Made with Gridsome, hosted on Netlify.</p>
      <p class="mt-0 mb-0">Source code on <a href="https://github.com/insidert/insidert" target="_blank">GitHub</a>.</p>
    </footer>

  </Layout>
</template>

<page-query>
query {
  posts: allPost(sortBy: "updatedOn", order: DESC, limit:5) {
    edges {
      node {
        id
        title
        excerpt
        updatedOn
        path
      }
    }
  }
}
</page-query>

<script>
import PostsList from "~/components/PostsList.vue";

export default {
  metaInfo() {
    const title = "Inside Ravi Teja";

    const description = "Personal blog of Ravi Teja.";

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
          content: "https://insidert.com"
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
    PostsList
  }
}
</script>

