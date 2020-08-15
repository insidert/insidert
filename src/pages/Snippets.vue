<template>
  <Layout>
    <page-head title="Snippets" description="Snippets are blog posts about code. They are mostly short and concise."></page-head>
    
    <section class="pad">
      <div v-for="edge in $page.snippets.edges" v-bind:key="edge.node.id">
        <small>{{ new Date(edge.node.updatedOn).toDateString() }}</small>
        <h2 class="mb-0 mt-0"><a v-bind:href="edge.node.path">{{ edge.node.title }}</a></h2>
        <p class="mt-0">{{ edge.node.excerpt }}</p>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query {
  snippets: allSnippet(sortBy: "title", order: ASC) {
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
import InProgress from "~/components/InProgress.vue";

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
    InProgress
  }  
}
</script>