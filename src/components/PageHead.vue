<template>
  <div>
    <small class="links"><g-link to="/">Homepage</g-link></small>
    <div class="nav">
      <h2 class="mb-0">{{ title }}</h2>
      <p class="mt-0">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "description"]
}
</script>
