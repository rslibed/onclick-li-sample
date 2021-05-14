import ApplicationBase = require("ApplicationBase/ApplicationBase");

const CSS = {
  loading: "configurable-application--loading"
};

import {
  createMapFromItem,
  createView,
  getConfigViewProperties,
  getItemTitle,
  findQuery,
  goToMarker
} from "ApplicationBase/support/itemUtils";

import {
  setPageLocale,
  setPageDirection,
  setPageTitle
} from "ApplicationBase/support/domHelper";

import OnclickLISample from "../OnclickLISample/OnclickLISample";

class OnclickLISampleApp {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  ApplicationBase
  //----------------------------------
  base: ApplicationBase = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  public init(base: ApplicationBase): void {
    if (!base) {
      console.error("ApplicationBase is not defined");
      return;
    }

    setPageLocale(base.locale);
    setPageDirection(base.direction);

    this.base = base;

    const { config, results, settings } = base;
    const { find, marker } = config;
    const { webMapItems } = results;

    const validWebMapItems = webMapItems.map(response => {
      return response.value;
    });

    const firstItem = validWebMapItems[0];

    if (!firstItem) {
      console.error("Could not load an item to display");
      return;
    }

    config.title = !config.title ? getItemTitle(firstItem) : "";
    setPageTitle(config.title);

    // todo: Typings will be fixed in next release.
    const portalItem: any = this.base.results.applicationItem.value;
    const appProxies =
      portalItem && portalItem.appProxies ? portalItem.appProxies : null;

    const defaultViewProperties = getConfigViewProperties(config);

    validWebMapItems.forEach(item => {
      const viewNode = document.createElement("div");

      const container = {
        container: viewNode
      };

      const viewProperties = {
        ...defaultViewProperties,
        ...container
      };

      createMapFromItem({ item, appProxies }).then(map =>
        createView({
          ...viewProperties,
          map
        }).then(view => {
          findQuery(find, view).then(() => goToMarker(marker, view));

          new OnclickLISample({
            container: document.getElementById("onclickLISample")
          });
        })
      );
    });

    document.body.classList.remove(CSS.loading);
  }
}

export = OnclickLISampleApp;
