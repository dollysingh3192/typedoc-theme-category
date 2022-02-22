/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import { Application, JSX } from 'typedoc';

import { OverrideTheme } from './themes/OverrideTheme';

/**
 *Load function.
 */
export const load = (app: Application): void => {
  app.renderer.hooks.on(
    'head.end',
    (context): JSX.Element => (
      <link rel='stylesheet' href={context.relativeURL('assets/custom.css')} />
    ),
  );

  app.renderer.hooks.on(
    'body.end',
    (context): JSX.Element => (
      <script src={context.relativeURL('assets/custom.js')} />
    ),
  );

  app.renderer.defineTheme('category', OverrideTheme);
};
