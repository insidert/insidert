<template>
  <Layout>
    <page-head title="Projects" description="List of projects I am working on. Click on a project to read more about the idea, implementations, technology stack and other updates."></page-head>
    
    <section class="pad">
      <div v-for="edge in $page.projects.edges" v-bind:key="edge.node.id">
        <h3 class="mb-0"><a v-bind:href="edge.node.path">{{ edge.node.title }}</a></h3>
        <p class="mt-0">{{ edge.node.excerpt }}</p>
      </div>

      <in-progress item="Page"></in-progress>
    </section>
  </Layout>
</template>

<page-query>
query {
  projects: allProject {
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
    const title = "Projects of Ravi Teja";

    const description = "Projects built by Ravi Teja.";

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