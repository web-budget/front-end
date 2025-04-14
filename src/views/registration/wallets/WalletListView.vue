<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import WalletClient from '@/services/registration/wallet.client'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import ItemsTable from '@/components/listing/ItemsTable.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'

const router = useRouter()

const loading = ref(false)

const pageRequest = reactive(new PageRequest())
const pageResponse = reactive(new PageResponse())

const walletClient = new WalletClient()

function changeToAdd() {
  router.push({ name: 'wallets.create' })
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

function changeToDetail({ data }) {
  router.push({
    name: 'wallets.detail',
    params: { id: data.id },
  })
}

async function applyFilters() {
  try {
    loading.value = true
    const response = await walletClient.findAll(pageRequest)
    PageResponse.applyValues(response.data, pageResponse)
  } catch (error) {
    console.log(error) // FIXME
  } finally {
    loading.value = false
  }
}

function onPageChange(event) {
  pageRequest.size = event.pageSize
  pageRequest.current = event.currentPage
  applyFilters()
}

function onTableSorted(event) {
  pageRequest.sortField = event.sortField
  pageRequest.direction = event.sortOrder
  applyFilters()
}

onMounted(() => {
  applyFilters()
})
</script>

<template>
  <div class="card">
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <search-controls
        @onNew="changeToAdd()"
        @onFilterReset="applyFilters()"
        @onFilterChange="applyFilters()"
        v-model:status="pageRequest.status"
        v-model:filter="pageRequest.filter"
        :placeholder="$t('wallets.search.placeholder')"
      />
    </div>
    <items-table
      :loading="loading"
      :data="pageResponse.content"
      @pageChanged="onPageChange($event)"
      @tableSorted="onTableSorted($event)"
      @rowSelected="changeToDetail($event)"
      :totalElements="pageResponse.totalElements"
    >
      <template #columns>
        <Column field="name" :header="$t('wallets.items-table.name')" :sortable="true" />
        <Column field="type" :header="$t('cards.items-table.type')" :sortable="true">
          <template #body="slotProps">
            {{ $t(`wallets.type.${slotProps.data.type.toLowerCase().replaceAll('_', '-')}`) }}
          </template>
        </Column>
        <Column headerStyle="width: 12%" :header="$t('items-table.columns.actions')">
          <template #body="slotProps">
            <action-buttons
              @onEdit="changeToUpdate(slotProps.data.id)"
              @onDelete="changeToDelete(slotProps.data.id)"
            />
          </template>
        </Column>
      </template>
    </items-table>
  </div>
</template>
