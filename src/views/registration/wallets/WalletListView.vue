<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import ItemsTable from '@/components/listing/ItemsTable.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'

import { useWalletStore } from '@/stores/registration/wallet.store'

const router = useRouter()

const { findAll } = useWalletStore()
const { loading, pageResponse, pageRequest } = storeToRefs(useWalletStore())

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

function onPageChange(event) {
  pageRequest.size = event.pageSize
  pageRequest.current = event.currentPage
  findAll()
}

function onTableSorted(event) {
  pageRequest.sortField = event.sortField
  pageRequest.direction = event.sortOrder
  findAll()
}

onMounted(() => {
  findAll()
})
</script>

<template>
  <div class="card">
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <search-controls
        @onNew="changeToAdd()"
        @onFilterReset="findAll()"
        @onFilterChange="findAll()"
        v-model:status="pageRequest.status"
        v-model:filter="pageRequest.filterText"
        :placeholder="$t('wallet.search.placeholder')"
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
        <Column field="name" :header="$t('wallet.table-columns.name')" :sortable="true" />
        <Column field="type" :header="$t('wallet.table-columns.type')" :sortable="true">
          <template #body="slotProps">
            {{ $t(`wallet.type.${slotProps.data.type.toLowerCase().replaceAll('_', '-')}`) }}
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
