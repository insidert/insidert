<template>
    <div>
      <small class="links">
        <g-link to="/">Homepage</g-link>
        <g-link to="/posts">All Posts</g-link>  
      </small>
      <section class="nav">
        <h1 class="mb-0 mt-0">{{ post.title }}</h1>
        <p class="mt-0">{{ post.excerpt }}</p>

        <small class="text-muted" style="display:flex; justify-content: space-between; flex-wrap: wrap;">Updated On {{ new Date(post.updatedOn).toDateString() }}. <span>{{ post.timeToRead }} {{ post.timeToRead == 1 ? 'minute' : 'minutes' }} read</span></small>
      </section>
    </div>
</template>

<script>
export default {
  props: [
    "post"
  ]
}
</script>
