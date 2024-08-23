import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneDropdownOption,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "DrawerNoticiasWebPartStrings";
import DrawerNoticias from "./components/DrawerNoticias";
import { IDrawerNoticiasProps } from "./interfaces/IDrawerNoticiasProps";
import { PropertyPaneDropdown } from "@microsoft/sp-property-pane";
import { SPHttpClient } from "@microsoft/sp-http";

export interface IDrawerNoticiasWebPartProps {
  description: string;
  selectedListId?: string;
}

export default class DrawerNoticiasWebPart extends BaseClientSideWebPart<IDrawerNoticiasWebPartProps> {
  private lists: IPropertyPaneDropdownOption[] = [];

  public render(): void {
    const element: React.ReactElement<IDrawerNoticiasProps> =
      React.createElement(DrawerNoticias, {
        context: this.context,
        selectedListId: this.properties.selectedListId,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      return this.fetchLists().then((options) => {
        this.lists = options;
        this.context.propertyPane.refresh();
      });
    });
  }

  private async fetchLists(): Promise<IPropertyPaneDropdownOption[]> {
    try {
      const response = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
        SPHttpClient.configurations.v1
      );
      const json = await response.json();
      return json.value.map((list: any) => ({
        key: list.Title,
        text: list.Title,
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown("selectedListId", {
                  label: "Lista de categorías",
                  options: this.lists,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
