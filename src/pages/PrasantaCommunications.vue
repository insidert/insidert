<template>
  <Layout>
    <page-head title="Prasanta Communications" description="The start of our dreams."></page-head>
    
    <div class="pad">
      <p>It was during my engineering I dreamt of having my own company. I know nothing about starting a company and how businesses work. But I wanted to do it badly. I started with an online classifieds project but abandoned it later for many reasons. After quitting my job in a startup, along with my brother on July 7, 2017, I started working on an online CRM for gyms. After iterating the product and validating it, we finally have set up Prasanta Communications. All our future projects and products will be under this company.</p>

      <in-progress item="Page"></in-progress>
    </div>
  </Layout>
</template>

<script>
import PageHead from "~/components/PageHead.vue";
import InProgress from "~/components/InProgress.vue";

export default {
  metaInfo() {
    const title = "Prasanta Communications";

    const description = "Company co-founded by Ravi Teja.";

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
          content: "https://insidert.com/prasanta-communications"
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

<style>

</style>