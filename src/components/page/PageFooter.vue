<template>
  <footer v-once class="footer footer-transparent d-print-none">
    <div class="container-xl">
      <div class="row text-center align-items-center flex-row-reverse">
        <div class="col-lg-auto ms-lg-auto">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item">
              <a
                href="https://license.webbudget.com.br"
                target="_blank"
                class="link-secondary"
              >
                {{ $t('home.footer.license') }}
              </a>
            </li>
            <li class="list-inline-item">
              <a
                href="https://docs.webbudget.com.br"
                target="_blank"
                class="link-secondary"
              >
                {{ $t('home.footer.documentation') }}
              </a>
            </li>
            <li class="list-inline-item">
              <a
                href="https://github.com/web-budget"
                target="_blank"
                class="link-secondary"
                rel="noopener"
              >
                {{ $t('home.footer.source-code') }}
              </a>
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-auto mt-3 mt-lg-0">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item">
              Copyright &copy; {{ new Date().getFullYear() }}
              <a
                href="https://webbudget.com.br"
                target="_blank"
                class="link-secondary"
              >
                webBudget
              </a>
              . All rights reserved.
            </li>
            <li class="list-inline-item">
              <a
                href="https://github.com/orgs/web-budget/projects/3/views/5"
                class="link-secondary"
                rel="noopener"
                target="_blank"
              >
                v{{ packageInfo.version }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import * as packageInfo from '../../../package.json'
</script>
