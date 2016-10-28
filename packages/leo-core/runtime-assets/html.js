import React, { Component } from 'react';

export default class HTML extends Component {

  render() {
    const {
      bundleAssets,
      data,
      body,
    } = this.props;

    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" type="text/css" href={`/${bundleAssets.static.css}`}/>
      </head>
      <body className="landing-page">
        <div id="react-mount" dangerouslySetInnerHTML={{__html: body}} />
        <script id="preloadedData"
                type="application/json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
        />
        <script src={'/js/client.js'} />
      </body>
      </html>
    )
  }
}
