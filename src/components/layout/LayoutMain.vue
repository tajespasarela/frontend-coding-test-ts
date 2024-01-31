<template>
  <nav class="bg-gray-800 text-white">
    <div class="mx-auto max-w-7xl px-8">
      <div class="min-h-16 relative flex items-center justify-between">
        <div
          class="flex flex-1 flex-wrap items-center justify-center gap-8 pb-4 sm:justify-start sm:pb-0"
        >
          <div class="flex flex-shrink-0 items-center">
            <img class="h-14 w-14" src="../../assets/logo.svg" />
            <img class="ml-3" src="../../assets/logotype.svg" />
          </div>
          <div class="flex items-center align-middle sm:ml-10">
            <div class="flex space-x-4">
              <router-link
                to="/"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                exact-active-class="bg-gray-900 text-white"
                >Home</router-link
              >
              <router-link
                to="/books"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                exact-active-class="bg-gray-900 text-white"
                >Books</router-link
              >
            </div>
          </div>
          <router-view name="header" />
        </div>
      </div>
    </div>
  </nav>
  <main class="mx-auto flex max-w-7xl justify-center px-2 py-8 sm:px-8">
    <router-view />
  </main>
</template>
