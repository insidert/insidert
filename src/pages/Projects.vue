<template>
  <Layout>
    <page-head title="Projects" description="List of projects I am working on. Click on a project to read more about the idea, implementations, technology stack and other updates."></page-head>
    
    <section class="pad">
      <div v-for="edge in $page.projects.edges" v-bind:key="edge.node.id">
        <h3 class="mb-0"><a v-bind:href="edge.node.path">{{ edge.node.title }}</a></h3>
        <p class="mt-0">{{ edge.node.excerpt }}</p>
      </div>
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

export default {
  metaInfo: {
    title: "Projects of Ravi Teja",
    meta: [
      {key: "description", name: "description", content: "Projects built by Ravi Teja."}
    ]
  },

  components: {
    PageHead
  }  
}
</script>