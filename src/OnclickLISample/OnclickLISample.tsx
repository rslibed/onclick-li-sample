import Widget from "esri/widgets/Widget";
import { tsx } from "esri/widgets/support/widget";
import { subclass } from "esri/core/accessorSupport/decorators";

const CSS = {
  base: "onclick-sample",
  outerContainer: "onclick-sample__outer-container",
  innerContainer: "onclick-sample__inner-container",
  label: "onclick-sample__label",
  summary: "onclick-sample__summary"
};

@subclass("OnclickLISample")
class OnclickLISample extends Widget {
  render() {
    return (
      <calcite-shell>
        <calcite-shell-panel>
          <calcite-panel>
            <ul>
              <li
                bind={this}
                onclick={this._click}
                class={CSS.base}
                tabindex="0"
                role="menuitem"
              >
                <div class={CSS.outerContainer}>
                  <div class={CSS.innerContainer}>
                    <p class={CSS.label}>Test label</p>
                    <p class={CSS.summary}>Summary</p>
                  </div>
                </div>
              </li>
            </ul>
          </calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>
    );
  }

  private _click(e: Event): void {
    console.log("CLICKED");
  }
}

export = OnclickLISample;
