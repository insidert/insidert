<template>
  <section class="nav">
    <small style="display: flex; justify-content: space-between;">
      <g-link to="/">Homepage</g-link>
      <g-link to="/posts">All Posts</g-link>  
    </small>
    <h1 class="mb-0">{{ post.title }}</h1>
    <p class="mt-0">{{ post.excerpt }}</p>
    <small style="display:flex; justify-content: space-between;">Updated On {{ new Date(post.updatedOn).toDateString() }}. <span>{{ post.timeToRead }} minutes read</span></small>
  </section>
</template>

<script>
export default {
  props: [
    "post"
  ]
}
</script>
