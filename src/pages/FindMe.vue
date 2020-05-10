<template>
  <Layout>
    <page-head title="Find Me" description="I am available on many social platforms."></page-head>
    
    <section class="pad">
      <p>I post the content on these platforms at once so you can find the content in every network except on Instagram.</p>
      <ol>
        <li><a href="https://facebook.com/insideraviteja">Facebook</a></li>
        <li><a href="https://twitter.com/_insidert">Twitter</a></li>
        <li><a href="https://linkedin.com/veligatlraviteja">LinkedIn</a></li>
        <li><a href="https://instagram.com/_insidert">Instagram</a></li>
      </ol>

      <p>I share technical writings of Coder Bootcamp on these platforms.</p>
      <ol>
        <li><a href="https://medium.com/@insidert">Medium</a></li>
        <li><a href="https://dev.to/insidert">Devto</a></li>
      </ol>
    </section>
  </Layout>
</template>

<script>
import PageHead from "~/components/PageHead.vue";

export default {
  metaInfo() {
    const title = "Contact Ravi Teja";

    const description = "Ways to connect with Ravi Teja.";

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
          content: "https://insidert.com/find-me"
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
    PageHead
  }  
}
</script>

<style>

</style>