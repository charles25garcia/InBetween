<script lang="ts" setup>
const props = defineProps({
  referralId: {
    type: String,
    required: true,
  },
});

const updatedReferralId = ref(props.referralId);

watch(
  () => props.referralId,
  (newValue) => {
    updatedReferralId.value = newValue;
  }
);

const runtimeConfig = useRuntimeConfig();

const registerUrl =
  runtimeConfig.public.hostName +
  runtimeConfig.public.api.user.url +
  "/registration";

const copyLink = async () => {
  await navigator.clipboard.writeText(
    `${registerUrl}/${updatedReferralId.value}`
  );
};
</script>

<template>
  <div class="flex justify-center items-center">
    <span class="text-white">Referral Link</span>
    <div class="group flex relative text-lg">
      <button
        type="button"
        class="ml-1 px-3 py-1 hover:text-yellow-500"
        id="referralLink"
        @click="copyLink"
      >
        <font-awesome-icon :icon="['fass', 'copy']" />
      </button>
      <span
        class="group-hover:opacity-100 text-center transition-opacity py-2 px-3 bg-gray-800 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-2 mx-auto w-24"
      >
        Copy link
      </span>
    </div>
  </div>
</template>
