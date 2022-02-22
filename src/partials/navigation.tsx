/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable unicorn/no-for-loop */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */

import { ContainerReflection, DefaultThemeRenderContext, JSX, PageEvent, Reflection } from 'typedoc';
import { DeclarationReflection } from 'typedoc/dist/lib/models/reflections/declaration';

const secondaryNavigation = (context: DefaultThemeRenderContext, props: PageEvent<Reflection>): JSX.Element | undefined => {
  const children = props.model instanceof ContainerReflection ? props.model.children || [] : [];

  const obj: { [key: string]: DeclarationReflection[] } = {};

  for (let i = 0; i < children.length; i++) {
    const temp = children[i];

    if (temp) {
      const str = temp.kindString as string;

      if (!obj[str]) {
        obj[str] = [];
      }
      obj[str]?.push(temp);
    }
  }

  const template: JSX.Element[] = [];

  Object.keys(obj).forEach((child) => {
    const content = obj[child] || [];

    const x = (<li>
      <span class='caret'>{child}</span>
      <ul class='nested'>
        {content.map((subItem) => {
          return (
            <li class={subItem.cssClasses}>
              <a
                class='tsd-kind-icon'
                href={context.urlTo(subItem)}
              >
                {subItem.name}
              </a>
            </li>
          )
        })}
      </ul>
    </li>);

    template.push(x);
  });

  const pageNavigation = (
    <ul id="myUL">
      {template}
    </ul>
  );

  return (
    <nav class="tsd-navigation secondary menu-sticky">
      {pageNavigation}
    </nav>
  );
}

/**
 *Definition.
 */
export const navigation = (
  context: DefaultThemeRenderContext,
  props: PageEvent<Reflection>,
): JSX.Element => {


  return (
    <div>
      {secondaryNavigation(context, props)}
    </div>
  );
};

