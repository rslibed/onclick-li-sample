(() => {
  const { pathname, search } = window.location;
  const distPath = pathname.substring(0, pathname.lastIndexOf("/"));
  const appPath = distPath.slice(0, distPath.lastIndexOf("/"));
  const localeUrlParamRegex = /locale=([\w-]+)/;
  const dojoLocale = search.match(localeUrlParamRegex) ? RegExp.$1 : undefined;

  const config = {
    async: true,
    locale: dojoLocale,
    packages: [
      {
        name: "Application",
        location: `${distPath}/src/app`,
        main: "init"
      },
      {
        name: "ApplicationBase",
        location: `${appPath}/node_modules/@esri/application-base-js`,
        main: "ApplicationBase"
      },
      {
        name: "OnclickLISample",
        location: `${distPath}/src/OnclickLISample`
      },
      {
        name: "config",
        location: `${distPath}/src/config`
      }
    ]
  };

  window["dojoConfig"] = config;
})();
