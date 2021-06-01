<template>
  <Layout>
    <div class="pad">
      <h1 class="mb-0">Resource Not Found.</h1>
      <p class="mt-0">The resource you are trying to find is not available.</p>
      <g-link to="/">Return to home</g-link>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    const title = "404 - Inside Ravi Teja";

    const description = "Resource not found.";

    return {
      title: title,
      meta: [
        {
          key: "description",
          name: "description",
          content: description,
        }
      ],
    };
  },
};
</script>

