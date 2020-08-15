<template>
  <Layout>
    <nav class="nav">
      <g-image src="~/assets/images/raviteja.png" height="128" width="128" />
      <h1 class="mb-0">Inside Ravi Teja</h1>
      <p class="mt-0">Hello! welcome to my website, I am co-founder of <g-link to="/prasanta-communications">
        Prasanta Communications
      </g-link> and a full-stack developer. I write about <g-link to="/projects">my projects</g-link>, thoughts and important updates here. You can also <g-link to="/find-me">find me</g-link> on other social platforms.</p>
    </nav>

    <section class="pad text-center">
      <div>
        <p>function <i>whatIsNewHere</i>() { return <g-link to="/snippets">'Snippets'</g-link>; }</p>
      </div>
    </section>

    <section class="pad">
      <h3>Latest Posts</h3>
      <posts-list v-bind:posts="$page.posts.edges"></posts-list>

      <div class="flex-between">
        <g-link to="/posts">View More Posts</g-link>
        <g-link to="/tags">Explore Tags</g-link>
      </div>

      <div style="margin-top: 6rem; margin-bottom: 1rem; text-align: center;">
        <small class="mb-0">Made with Gridsome, hosted on Netlify.</small> <br>
        <small class="mt-0 mb-0">Source code on <a href="https://github.com/insidert/insidert" target="_blank">GitHub</a>.</small>
      </div>
    </section>
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

