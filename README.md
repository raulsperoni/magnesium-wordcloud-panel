# WordCloud Panel Plugin

This is a Wordcloud/Tagcloud panel for Grafana 7.0+, using the amazing library [react-wordcloud](https://react-wordcloud.netlify.com/)

## Usage

You need to configure a datasource so that the query returns a list of tokens. Then use group by terms.
You should change the names of word, and count fields in the options tab of the plugin.
The amount of words is configured in the datasource settings. In those settings is also important that you choose "Order by: Doc Count".

Every other settings for the wordcloud can be changed in the plugin options tab.

## Getting started
1. Install dependencies
```BASH
yarn install
```
2. Build plugin in development mode or run in watch mode
```BASH
yarn dev
```
or
```BASH
yarn watch
```
3. Build plugin in production mode
```BASH
yarn build
```

