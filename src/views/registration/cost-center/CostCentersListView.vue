<template>
  <page-content pre-title="cost-center.header.pre-title" title="cost-center.header.title">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <search-controls
            @onAdd="changeToAdd()"
            @onFilter="applyFilter()"
            v-model:filter="pageRequest.filter"
            v-model:status="pageRequest.status"
            :placeholder="$t('cost-center.search.filters')"/>
        </div>
        <div class="card-body border-bottom p-0">
          <DataTable
            dataKey="id"
            :lazy="true"
            :rowHover="true"
            sortMode="multiple"
            :paginator="true"
            stateStorage="session"
            selectionMode="single"
            :rows="pageRequest.size"
            responsiveLayout="scroll"
            :value="pageResponse.content"
            @page="onPageChange($event)"
            :loading="viewState.gridLoading"
            stateKey="dt-state-demo-session"
            @row-select="changeToDetail()"
            :rowsPerPageOptions="[15,30,60]"
            v-model:selection="viewState.selectedValue"
            :total-records="pageResponse.totalElements"
            :currentPageReportTemplate="translatePageReport()"
            class="table card-table table-vcenter text-nowrap datatable"
            paginatorTemplate="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink">

            <template #empty>
              {{ $t('grid.state.empty') }}
            </template>
            <template #loading>
              {{ $t('grid.state.loading') }}
            </template>

            <Column field="active" headerStyle="width: 10%" :header="$t('grid.columns.status')" :sortable="true">
              <template #body="slotProps">
                <status-badge :active="slotProps.data.active" />
              </template>
            </Column>
            <Column field="description" :header="$t('cost-center.grid.description')" :sortable="true" />
            <Column headerStyle="width: 12%" :header="$t('grid.columns.actions')">
              <template #body="slotProps">
                <action-buttons
                  @onEdit="changeToEdit(slotProps.data.id)"
                  @onDelete="changeToDelete(slotProps.data.id)" />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </page-content>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import router from '@/router'

import PageContent from '@/components/home/PageContent.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'
import StatusBadge from '@/components/listing/StatusBadge.vue'
import SearchControls from '@/components/listing/SearchControls.vue'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import CostCenterClient from '@/clients/registration/cost-center.client'

const { t } = useI18n()

const viewState = reactive({
  gridLoading: false,
  selectedValue: null
})

const pageRequest = reactive(new PageRequest())
const pageResponse = reactive(new PageResponse())

const costCenterClient = new CostCenterClient()

onMounted(() => {
  applyFilter()
})

async function applyFilter() {
  try {
    viewState.gridLoading = true
    const response = await costCenterClient.findAll(pageRequest)
    PageResponse.applyValues(response.data, pageResponse)
  } catch (error) {
    console.log(error)
  } finally {
    viewState.gridLoading = false
  }
}

function onPageChange(event) {
  pageRequest.current = event.page
  pageRequest.size = event.rows
  applyFilter()
}

function translatePageReport() {
  return t('grid.status.showing') + '{first}' + t('grid.status.until') + '{last}' + t('grid.status.total') + '{totalRecords}'
}

function changeToEdit(id) {
  router.push({ name: 'cost-centers.edit', params: { id: id } })
}

function changeToDelete(id) {
  router.push({ name: 'cost-centers.delete', params: { id: id } })
}

function changeToDetail() {
  router.push({ name: 'cost-centers.detail', params: { id: viewState.selectedValue.id } })
}

function changeToAdd() {
  router.push({ name: 'cost-centers.add' })
}
</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
    .p-paginator-rpp-options {
        margin-right: auto;
    }
}
</style>
