/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-classes-per-file */
import {
  DefaultTheme,
  DefaultThemeRenderContext,
  Options,
  RendererEvent,
} from 'typedoc';
import { Renderer } from 'typedoc/dist/lib/output/renderer';
import { copy } from 'fs-extra';
// eslint-disable-next-line unicorn/prefer-node-protocol
import path from 'path';

import { navigation } from '../partials/navigation';

function bind<F, L extends any[], R>(fn: (f: F, ...a: L) => R, first: F) {
  return (...r: L) => fn(first, ...r);
}
class OverrideThemeContext extends DefaultThemeRenderContext {
  public constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);

    this.navigation = bind(navigation, this);
  }
}

export class OverrideTheme extends DefaultTheme {
  private _contextCache?: OverrideThemeContext;

  public constructor(renderer: Renderer) {
    super(renderer);

    this.listenTo(this.owner, RendererEvent.END, async () => {
      const out = this.application.options.getValue('out');

      await copy(
        path.join(
          process.cwd(),
          '/node_modules/typedoc-theme-category/dist/assets',
        ),
        path.join(out, '/assets'),
      );
    });
  }

  // eslint-disable-next-line prettier/prettier
  /**
   * GetRender.
   */
  public override getRenderContext(): OverrideThemeContext {
    this._contextCache ||= new OverrideThemeContext(
      this,
      this.application.options,
    );

    return this._contextCache;
  }
}
