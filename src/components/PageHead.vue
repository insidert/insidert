<template>
  <nav class="nav">
    <g-link to="/">Homepage</g-link>

    <h2 class="mb-0">{{ title }}</h2>
    <p class="mt-0">{{ description }}</p>
  </nav>
</template>

<script>
export default {
  props: ["title", "description"]
}
</script>
