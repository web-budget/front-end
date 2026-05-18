<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import ItemsTable from '@/components/listing/ItemsTable.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'

import { useClassificationStore } from '@/stores/registration/classification.store'
import CurrencyDisplay from '@/components/common/CurrencyDisplay.vue'

const router = useRouter()

const { findAll } = useClassificationStore()
const { loading, pageResponse, pageRequest } = storeToRefs(useClassificationStore())

function changeToAdd() {
  router.push({ name: 'classifications.create' })
}

function changeToUpdate(id) {
  router.push({
    name: 'classifications.update',
    params: { id: id }
  })
}

function changeToDelete(id) {
  router.push({
    name: 'classifications.delete',
    params: { id: id }
  })
}

function changeToDetail({ data }) {
  router.push({
    name: 'classifications.detail',
    params: { id: data.id }
  })
}

function onPageChange(event) {
  pageRequest.value.size = event.pageSize
  pageRequest.value.current = event.currentPage
  findAll()
}

function onTableSorted(event) {
  pageRequest.value.sortField = event.sortField
  pageRequest.value.direction = event.sortOrder
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
        @onFilterChange="findAll()"
        @onFilterReset="findAll()"
        v-model:status="pageRequest.status"
        v-model:filter="pageRequest.filterText"
        :placeholder="$t('classification.search.placeholder')"
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
        <Column field="name" :header="$t('classification.table-columns.name')" :sortable="true" />
        <Column field="type" :header="$t('classification.table-columns.type')" :sortable="true">
          <template #body="{ data }">
            {{ $t(`classification.type.${data.type.toLowerCase()}`) }}
          </template>
        </Column>
        <Column
          field="budget"
          headerStyle="width: 20%"
          :header="$t('classification.table-columns.budget')"
        >
          <template #body="{ data }">
            <currency-display :value="data.budget" />
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
