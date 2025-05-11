<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import ItemsTable from '@/components/listing/ItemsTable.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'
import CurrencyDisplay from '@/components/common/CurrencyDisplay.vue'

import { useCostCenterStore } from '@/stores/registration/cost-center.store'

const router = useRouter()

const { findAll } = useCostCenterStore()
const { loading, pageResponse, pageRequest } = storeToRefs(useCostCenterStore())

function changeToAdd() {
  router.push({ name: 'cost-centers.create' })
}

function changeToUpdate(id) {
  router.push({
    name: 'cost-centers.update',
    params: { id: id },
  })
}

function changeToDelete(id) {
  router.push({
    name: 'cost-centers.delete',
    params: { id: id },
  })
}

function changeToDetail({ data }) {
  router.push({
    name: 'cost-centers.detail',
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
        :placeholder="$t('cost-center.search.placeholder')"
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
        <Column field="name" :header="$t('cost-center.table-columns.name')" :sortable="true" />
        <Column headerStyle="width: 15%" :header="$t('cost-center.table-columns.income-budget')">
          <template #body="{ data }">
            <currency-display :value="data.incomeBudget" />
          </template>
        </Column>
        <Column headerStyle="width: 15%" :header="$t('cost-center.table-columns.expense-budget')">
          <template #body="{ data }">
            <currency-display :value="data.expenseBudget" />
          </template>
        </Column>
        <Column headerStyle="width: 12%" :header="$t('items-table.columns.actions')">
          <template #body="{ data }">
            <action-buttons @onEdit="changeToUpdate(data.id)" @onDelete="changeToDelete(data.id)" />
          </template>
        </Column>
      </template>
    </items-table>
  </div>
</template>
