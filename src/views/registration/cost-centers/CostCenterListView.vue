<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import CostCenterClient from '@/http/registration/cost-center.client'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import StatusBadge from '@/components/listing/StatusBadge.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'

const translation = useI18n()
const router = useRouter()

const options = [
  {
    label: translation.t('buttons.actions.all'),
    value: 'ALL',
  },
  {
    label: translation.t('buttons.actions.inactive'),
    value: 'INACTIVE',
  },
  {
    label: translation.t('buttons.actions.active'),
    value: 'ACTIVE',
  },
]

const loading = ref(false)

const pageRequest = reactive(new PageRequest())
const pageResponse = reactive(new PageResponse())

const costCenterClient = new CostCenterClient()

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

function changeToDetail(event) {
  const { id } = event.data
  router.push({
    name: 'cost-centers.detail',
    params: { id: id },
  })
}

async function applyFilters() {
  try {
    loading.value = true
    const response = await costCenterClient.findAll(pageRequest)
    PageResponse.applyValues(response.data, pageResponse)
    console.log(pageResponse)
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
  pageRequest.direction = event.direction
  applyFilters()
}

function translatePageReport() {
  return (
    translation.t('data-table.footer.showing') +
    '{first}' +
    translation.t('data-table.footer.until') +
    '{last}' +
    translation.t('data-table.footer.total') +
    '{totalRecords}'
  )
}

onMounted(() => {
  applyFilters()
})
</script>

<template>
  <div class="card">
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <SelectButton
        v-model="pageRequest.status"
        :options="options"
        option-label="label"
        option-value="value"
      />
      <InputGroup>
        <InputText
          v-model="pageRequest.filterText"
          :placeholder="$t('cost-centers.search.placeholder')"
        />
        <Button @click="applyFilters()" :label="$t('buttons.actions.search')" />
      </InputGroup>
      <Button
        class="w-1/12"
        severity="success"
        @click="changeToAdd()"
        :label="$t('buttons.actions.new')"
      />
    </div>
    <DataTable
      :lazy="true"
      dataKey="id"
      rowHover
      paginator
      autoLayout
      :value="pageResponse.content"
      removableSort
      selectionMode="single"
      :rows="pageResponse.size"
      :loading="loading"
      @sort="onTableSorted"
      :rowsPerPageOptions="[15, 30, 60]"
      :totalRecords="pageResponse.totalElements"
      :currentPageReportTemplate="translatePageReport()"
      @row-select="changeToDetail"
      @page="onPageChange"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    >
      <template #empty>
        {{ $t('data-table.state.empty') }}
      </template>
      <template #loading>
        {{ $t('data-table.state.loading') }}
      </template>

      <Column
        field="active"
        headerStyle="width: 10%"
        :header="$t('data-table.columns.status')"
        :sortable="true"
      >
        <template #body="slotProps">
          <status-badge :active="slotProps.data.active" />
        </template>
      </Column>
      <Column field="name" :header="$t('data-table.cost-centers.name')" :sortable="true" />
      <Column
        field="incomeBudget"
        headerStyle="width: 15%"
        :header="$t('data-table.cost-centers.income-budget')"
      />
      <Column
        field="expenseBudget"
        headerStyle="width: 15%"
        :header="$t('data-table.cost-centers.expense-budget')"
      />
      <Column headerStyle="width: 12%" :header="$t('data-table.columns.actions')">
        <template #body="slotProps">
          <action-buttons
            @onEdit="changeToUpdate(slotProps.data.id)"
            @onDelete="changeToDelete(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
