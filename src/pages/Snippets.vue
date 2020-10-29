<template>
  <Layout>
    <page-head title="Snippets" description="Snippets are blog posts about code. They are mostly short and concise."></page-head>
    
    <section class="pad">
      <posts-list v-bind:posts="$page.snippets.edges"></posts-list>
    </section>
  </Layout>
</template>

<page-query>
query {
  snippets: allSnippet(sortBy: "title", order: DESC) {
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
    const title = "Code Snippets from Ravi Teja";

    const description = "Code examples for different features.";

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
          content: "https://insidert.com/projects"
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
    PageHead,
    PostsList
  }  
}
</script>