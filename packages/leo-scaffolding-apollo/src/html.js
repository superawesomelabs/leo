import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
  static propTypes = {
    body: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };
  render() {
    const {
      bundleAssets,
      data,
      body,
    } = this.props;

    return <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" type="text/css" href={`/${bundleAssets.static.css}`}/>
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: body }} />
        <script
          dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${JSON.stringify({ apollo: { data }})};` }}
          charSet="UTF-8"
        />
        <script src='/js/client.js' charSet="UTF-8" />
      </body>
    </html>
  }
}
