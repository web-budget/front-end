<template>
  <DataTable
    :lazy="true"
    dataKey="id"
    :rowHover="true"
    :paginator="true"
    :autoLayout="true"
    :value="props.data"
    :removableSort="true"
    selectionMode="single"
    :rows="props.pageSize"
    :loading="props.loading"
    @sort="fireTableSorted($event)"
    :rowsPerPageOptions="[15,30,60]"
    v-model:selection="selectedRowValue"
    :totalRecords="props.totalElements"
    :currentPageReportTemplate="translatePageReport()"
    @row-select="$emit('rowSelected', selectedRowValue)"
    class="table card-table table-vcenter text-nowrap datatable"
    @page="$emit('pageChanged', { currentPage: $event.page, pageSize: $event.rows })"
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

const emit = defineEmits(['pageChanged', 'rowSelected', 'tableSorted'])

function translatePageReport() {
  return t('grid.status.showing') + '{first}' + t('grid.status.until') +
  '{last}' + t('grid.status.total') + '{totalRecords}'
}

function fireTableSorted(event) {
  const order = event.sortOrder != null
    ? event.sortOrder > 0 ? 'asc' : 'desc'
    : event.sortOrder

  emit('tableSorted', { sortField: event.sortField, direction: order })
}
</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
    .p-paginator-current {
      margin-right: auto;
    }
}
</style>