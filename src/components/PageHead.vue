<template>
  <nav class="nav">
    <h2 class="mb-0">{{ title }}</h2>
    <p class="mt-0">{{ description }}</p>

    <g-link to="/">Homepage</g-link>
  </nav>
</template>

<script>
export default {
  props: ["title", "description"]
}
</script>
