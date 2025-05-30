<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import ItemsTable from '@/components/listing/ItemsTable.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'

import { useMovementClassStore } from '@/stores/registration/movement-class.store'

const router = useRouter()

const { findAll } = useMovementClassStore()
const { loading, pageResponse, pageRequest } = storeToRefs(useMovementClassStore())

function changeToAdd() {
  router.push({ name: 'movement-classes.create' })
}

function changeToUpdate(id) {
  router.push({
    name: 'movement-classes.update',
    params: { id: id },
  })
}

function changeToDelete(id) {
  router.push({
    name: 'movement-classes.delete',
    params: { id: id },
  })
}

function changeToDetail({ data }) {
  router.push({
    name: 'movement-classes.detail',
    params: { id: data.id },
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
        :placeholder="$t('movement-class.search.placeholder')"
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
        <Column field="name" :header="$t('movement-class.table-columns.name')" :sortable="true" />
        <Column
          :sortable="true"
          field="costCenter.name"
          :header="$t('movement-class.table-columns.cost-center')"
        />
        <Column field="type" :header="$t('card.table-columns.type')" :sortable="true">
          <template #body="slotProps">
            {{ $t(`movement-class.type.${slotProps.data.type.toLowerCase()}`) }}
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
