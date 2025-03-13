<script setup>
import * as packageInfo from '../../package.json'
</script>

<template>
  <div class="layout-footer">
    <a
      href="https://webbudget.com.br"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary font-bold hover:underline"
    >
      webBudget
    </a>
    v{{ packageInfo.version }}
  </div>
</template>
