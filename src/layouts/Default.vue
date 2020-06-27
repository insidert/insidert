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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap');

body {
  font-family: 'Inter', sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
  font-size: x-large;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='2'%3E%3Cpath transform='translate(0 0)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='4' transform='rotate(0 800 450)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(0 0)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='4'%3E%3Cpath transform='translate(0 0)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='8' transform='rotate(0 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='rotate(0 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

main {
  max-width: 900px;
  margin: 10rem auto;
  background-color: white;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
}

@media screen and (max-width: 600px) {
  main {
    margin: auto;
  }

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

code {
  display: inline-block;
  color: white;
  background-color: black;
  padding: 4px 12px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}
</style>
