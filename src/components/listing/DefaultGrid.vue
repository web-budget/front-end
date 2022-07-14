<template>
  <DataTable
    dataKey="id"
    :lazy="true"
    :rowHover="true"
    :paginator="true"
    :value="props.data"
    sortMode="multiple"
    stateStorage="session"
    selectionMode="single"
    :rows="props.pageSize"
    :loading="props.loading"
    responsiveLayout="scroll"
    stateKey="dt-state-demo-session"
    :rowsPerPageOptions="[15,30,60]"
    v-model:selection="selectedRowValue"
    :total-records="props.totalElements"
    :currentPageReportTemplate="translatePageReport()"
    @row-select="$emit('onRowSelect', selectedRowValue)"
    class="table card-table table-vcenter text-nowrap datatable"
    @page="$emit('onPageChange', { currentPage: $event.page, pageSize: $event.rows })"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">

    <template #empty>
      {{ $t('grid.state.empty') }}
    </template>
    <template #loading>
      {{ $t('grid.state.loading') }}
    </template>

    <Column v-if="showStatus" field="active" headerStyle="width: 10%" :header="$t('grid.columns.status')" :sortable="true">
      <template #body="slotProps">
        <status-badge :active="slotProps.data.active" />
      </template>
    </Column>
    <slot name="columns"></slot>
  </DataTable>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import Column from 'primevue/column'
import DataTable from 'primevue/datatable'

import StatusBadge from '@/components/listing/StatusBadge.vue'

const { t } = useI18n()

const selectedRowValue = reactive({})

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
    default: false
  },
  showStatus: {
    type: Boolean,
    default: true
  },
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  totalElements: {
    type: Number,
    required: true,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 15
  }
})

defineEmits(['onPageChange', 'onRowSelect'])

function translatePageReport() {
  return t('grid.status.showing') + '{first}' + t('grid.status.until') +
  '{last}' + t('grid.status.total') + '{totalRecords}'
}
</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
    .p-paginator-current {
      margin-right: auto;
    }
}
</style>
