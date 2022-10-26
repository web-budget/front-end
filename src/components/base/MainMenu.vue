<template>
  <header v-once class='navbar navbar-expand-md navbar-dark navbar-overlap d-print-none'>
    <div class='container-xl'>
      <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbar-menu'>
        <span class='navbar-toggler-icon'></span>
      </button>
      <h1 class='navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3'>
        <router-link :to="{ name: 'home' }" class='wb-logo wb-logo-home'>
          webBudget
        </router-link>
      </h1>
      <div class='navbar-nav flex-row order-md-last'>
        <notification-menu />
        <user-menu />
      </div>
      <div class='collapse navbar-collapse' id='navbar-menu'>
        <div class='d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center'>
          <ul class='navbar-nav'>
            <li class='nav-item dropdown'>
              <a class='nav-link dropdown-toggle' href='#navbar-base' data-bs-toggle='dropdown'
                 data-bs-auto-close='outside' role='button' aria-expanded='false'>
                <span class='nav-link-icon d-md-none d-lg-inline-block'>
                  <currency-dollar-icon />
                </span>
                <span class='nav-link-title'>
                  {{ $t('main-menu.base.financial') }}
                </span>
              </a>
              <div class='dropdown-menu'>
                <div class='dropdown-menu-columns'>
                  <div class='dropdown-menu-column'>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.financial.credit-card-invoice') }}
                    </a>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.financial.bank-accounts') }}
                    </a>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.financial.financial-periods') }}
                    </a>
                  </div>
                  <div class='dropdown-menu-column'>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.financial.vehicle-logbook') }}
                    </a>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.financial.fixed-movements') }}
                    </a>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.financial.period-movements') }}
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li class='nav-item dropdown'>
              <a class='nav-link dropdown-toggle' href='#navbar-base' data-bs-toggle='dropdown'
                 data-bs-auto-close='outside' role='button' aria-expanded='false'>
                <span class='nav-link-icon d-md-none d-lg-inline-block'>
                  <chart-area-icon />
                </span>
                <span class='nav-link-title'>
                  {{ $t('main-menu.base.investments') }}
                </span>
              </a>
              <div class='dropdown-menu'>
                <div class='dropdown-menu-columns'>
                  <div class='dropdown-menu-column'>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.investments.stocks') }}
                    </a>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.investments.funds') }}
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li class='nav-item dropdown'>
              <a class='nav-link dropdown-toggle' href='#navbar-base' data-bs-toggle='dropdown'
                 data-bs-auto-close='outside' role='button' aria-expanded='false'>
                <span class='nav-link-icon d-md-none d-lg-inline-block'>
                  <edit-icon />
                </span>
                <span class='nav-link-title'>
                  {{ $t('main-menu.base.registration') }}
                </span>
              </a>
              <div class='dropdown-menu'>
                <div class='dropdown-menu-columns'>
                  <div class='dropdown-menu-column'>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.registration.vehicles') }}
                    </a>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.registration.wallets') }}
                    </a>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.registration.credit-cards') }}
                    </a>
                  </div>
                  <div class='dropdown-menu-column'>
                    <router-link class='dropdown-item' :to="{ name: 'cost-centers' }">
                      {{ $t('main-menu.registration.cost-centers') }}
                    </router-link>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.registration.movement-classes') }}
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li class='nav-item dropdown'>
              <a class='nav-link dropdown-toggle' href='#navbar-base' data-bs-toggle='dropdown'
                 data-bs-auto-close='outside' role='button' aria-expanded='false'>
                <span class='nav-link-icon d-md-none d-lg-inline-block'>
                  <adjustments-icon />
                </span>
                <span class='nav-link-title'>
                  {{ $t('main-menu.base.configurations') }}
                </span>
              </a>
              <div class='dropdown-menu'>
                <div class='dropdown-menu-columns'>
                  <div class='dropdown-menu-column'>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.configurations.users') }}
                    </a>
                    <a class='dropdown-item' href='#'>
                      {{ $t('main-menu.configurations.parameters') }}
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import UserMenu from '@/components/base/UserMenu.vue'
import NotificationMenu from '@/components/base/NotificationMenu.vue'

import { AdjustmentsIcon, ChartAreaIcon, CurrencyDollarIcon, EditIcon } from 'vue-tabler-icons'
</script>
