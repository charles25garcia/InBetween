<script lang="ts" setup>
import { AuditLogsDto } from "~/@core/dtos";
import { AdminHttp } from "~/@core/https";
import dayjs from "dayjs";

const auditLogs = ref<AuditLogsDto[]>([]);

onMounted(async () => {
  await reloadAuditLogs();
});

async function reloadAuditLogs() {
  auditLogs.value = await AdminHttp.getAuditLogs();
}
</script>

<template>
  <common-feature-container title="Audit Logs">
    <div class="audit-logs"></div>
    <br />
    <common-table
      export-file-name="Audit Logs"
      :items="
        auditLogs.map((i) => ({
          id: i.id,
          user: i.user.fullName,
          title: i.title,
          description: i.description,
          date: dayjs(i.loggerDateTime || '').format('YYYY-MM-DD h:mm A'),
        })).sort((a, b) => b.id - a.id)
      "
    ></common-table>
  </common-feature-container>
</template>
