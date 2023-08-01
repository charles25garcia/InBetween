export default defineNuxtRouteMiddleware((to) => {

  const accessToken = useCookie("jwt");

  const allowedRoutes = ["/user/signin", "/user/registration"];


  if (accessToken.value && (to.path === "/user/signin" || to.path === "/")) {
    const landingPage = useCookie("landingPage");

    return navigateTo(landingPage.value, { replace: true });
  }

  if (allowedRoutes.includes(to.path)) {
    return;
  }

  if (!accessToken.value) {
    return navigateTo("/user/signin", { replace: true });
  }
});
