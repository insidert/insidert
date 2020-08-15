<template>
  <main >
    <slot/>
  </main>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
@import url('https://fonts.googleapis.com/css2?family=Recursive:wght@400;900&display=swap');

body {
  font-family: 'Recursive', sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
  font-size: x-large;
  background-color: aliceblue;
}

main {
  max-width: 900px;
  margin: 10rem auto;
}

@media screen and (max-width: 900px) {
  main {
    margin: auto;
  }
}

@media screen and (max-width: 600px) {
  body {
    font-size: large;
  }
}

.mb-0 {
  margin-bottom: 0rem;
}

.mt-0 {
  margin-top: 0rem;
}

.pad {
  padding: 2rem;
}

.nav {
  padding: 2rem;
  background-color: lightcyan;
  box-shadow: 0 25px 25px -12px rgba(0,0,0,.25);
}

footer {
  text-align: center;
  background-color: lightcyan;
  padding: 2rem 0rem;
}

a:link {
  color: blue;
}

a:visited {
  color: blue;
}

a:hover {
  color: blue;
}

a:active {
  color: blue;
}

.text-center {
  text-align: center;
}

#post-content img {
  width: 100%;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

h1 {
  font-size: 42px;
  line-height: normal;
}
</style>
