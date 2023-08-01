export default defineNuxtRouteMiddleware((to) => {
  const { $sidebar } = useNuxtApp() as any;
  if (to.query.featureId) {
    $sidebar.activePageId.value = +to.query.featureId;
  }
});
