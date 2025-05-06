<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import ItemsTable from '@/components/listing/ItemsTable.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'
import DateTimeDisplay from '@/components/common/DateTimeDisplay.vue'
import SearchControls from '@/components/listing/SearchControls.vue'

import { useFinancialPeriodStore } from '@/stores/financial-period.store'

const { findAll } = useFinancialPeriodStore()
const { loading, pageResponse, pageRequest } = storeToRefs(useFinancialPeriodStore())

const statusOptions = [
  { label: 'financial-period.options.all', value: 'ALL' },
  { label: 'financial-period.options.accounted', value: 'ACCOUNTED' },
  { label: 'financial-period.options.open', value: 'OPEN' },
]

const router = useRouter()

function changeToAdd() {
  router.push({ name: 'financial-periods.create' })
}

function changeToUpdate(id) {
  router.push({
    name: 'financial-periods.update',
    params: { id: id },
  })
}

function changeToDelete(id) {
  router.push({
    name: 'financial-periods.delete',
    params: { id: id },
  })
}

function changeToDetail({ data }) {
  router.push({
    name: 'financial-periods.detail',
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
        status-initial-value="OPEN"
        :status-options="statusOptions"
        @onFilterChange="findAll()"
        @onFilterReset="findAll()"
        v-model:status="pageRequest.status"
        v-model:filter="pageRequest.filter"
        :placeholder="$t('financial-period.search.placeholder')"
      />
    </div>
    <items-table
      :loading="loading"
      :show-status="false"
      :data="pageResponse.content"
      @pageChanged="onPageChange($event)"
      @tableSorted="onTableSorted($event)"
      @rowSelected="changeToDetail($event)"
      :totalElements="pageResponse.totalElements"
    >
      <template #columns>
        <Column
          :sortable="true"
          headerStyle="width: 13%"
          :header="$t('financial-period.table-columns.status')"
        >
          <template #body="slotProps">
            <Tag
              v-if="slotProps.data.status === 'ACTIVE'"
              :value="$t('financial-period.status.active')"
              severity="success"
            />
            <Tag
              v-if="slotProps.data.status === 'ENDED'"
              :value="$t('financial-period.status.ended')"
              severity="warn"
            />
            <Tag
              v-if="slotProps.data.status === 'ACCOUNTED'"
              :value="$t('financial-period.status.accounted')"
              severity="danger"
            />
          </template>
        </Column>
        <Column field="name" :header="$t('financial-period.table-columns.name')" :sortable="true" />
        <Column headerStyle="width: 15%" :header="$t('financial-period.table-columns.starting-at')">
          <template #body="slotProps">
            <date-time-display :fix-time="true" :value="slotProps.data.startingAt" />
          </template>
        </Column>
        <Column headerStyle="width: 15%" :header="$t('financial-period.table-columns.ending-at')">
          <template #body="slotProps">
            <date-time-display :fix-time="true" :value="slotProps.data.endingAt" />
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
