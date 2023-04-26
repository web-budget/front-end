<template>
  <page-content title="wallet.title" action="pages.actions.listing">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <search-controls
            @onAdd="changeToAdd()"
            @onStatusChange="applyFilter()"
            v-model:filter="pageRequest.filter"
            v-model:status="pageRequest.status"
            :placeholder="$t('wallet.search.filters')"
          />
        </div>
        <div class="card-body border-bottom p-0">
          <default-grid
            :loading="loading"
            :data="pageResponse.content"
            @page-changed="onPageChange($event)"
            @table-sorted="onTableSorted($event)"
            @row-selected="changeToDetail($event)"
            :total-elements="pageResponse.totalElements"
          >
            <template #columns>
              <Column
                field="name"
                :header="$t('wallet.grid.name')"
                :sortable="true"
              >
                <template #body="{ data }">
                  <span v-if="data.bank">
                    {{ data.name + ' - ' + data.bank }}
                  </span>
                  <span v-else>{{ data.name }}</span>
                </template>
              </Column>
              <Column
                field="type"
                :header="$t('wallet.grid.type')"
                :sortable="true"
              >
                <template #body="{ data }">
                  {{ $t(walletTypes[data.type]) }}
                </template>
              </Column>
              <Column
                headerStyle="width: 12%"
                :header="$t('grid.columns.actions')"
              >
                <template #body="slotProps">
                  <action-buttons
                    @onEdit="changeToUpdate(slotProps.data.id)"
                    @onDelete="changeToDelete(slotProps.data.id)"
                  />
                </template>
              </Column>
            </template>
          </default-grid>
        </div>
      </div>
    </div>
  </page-content>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import router from '@/router'

import Column from 'primevue/column'

import PageContent from '@/components/page/PageContent.vue'

import DefaultGrid from '@/components/listing/DefaultGrid.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'
import { walletTypes } from '@/models/registration/wallet.model'

import WalletClient from '@/clients/registration/wallet.client'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'

const { handleError } = useHttpErrorHandler()

const loading = ref(false)
const pageRequest = reactive(new PageRequest())
const pageResponse = reactive(new PageResponse())

const walletClient = new WalletClient()

async function applyFilter() {
  try {
    loading.value = true
    const response = await walletClient.findAll(pageRequest)
    PageResponse.applyValues(response.data, pageResponse)
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function onPageChange(event) {
  pageRequest.size = event.pageSize
  pageRequest.current = event.currentPage
  applyFilter()
}

function onTableSorted(event) {
  pageRequest.sortField = event.sortField
  pageRequest.direction = event.direction
  applyFilter()
}

function changeToUpdate(id) {
  router.push({
    name: 'wallets.update',
    params: { id: id },
  })
}

function changeToDelete(id) {
  router.push({
    name: 'wallets.delete',
    params: { id: id },
  })
}

function changeToDetail(event) {
  const { id } = event.data
  router.push({
    name: 'wallets.detail',
    params: { id: id },
  })
}

function changeToAdd() {
  router.push({ name: 'wallets.create' })
}

onMounted(() => {
  applyFilter()
})
</script>
