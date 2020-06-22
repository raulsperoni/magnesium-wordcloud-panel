# ☁️ WordCloud Panel Plugin

This is a Wordcloud/Tagcloud panel for Grafana 7.0+, using the amazing library [react-wordcloud](https://github.com/chrisrzhou/react-wordcloud)

![Screenshot with query](https://raw.githubusercontent.com/raulsperoni/magnesium-wordcloud-panel/master/src/img/wordcloud-screenshot-query.png)


## Features

You can find features and personalization options [here](https://react-wordcloud.netlify.com/)


## Installation

* Clone this repo or copy the whole magnesium-wordcloud-panel dir into the Grafana plugins dir ( /usr/local/var/lib/grafana/plugins )
* Restart the Grafana server. If installed via Homebrew, this will be brew services restart grafana

## Usage

You need to configure a datasource so that the query returns a list of tokens. Then use group by terms.
You should change the names of word, and count fields in the options tab of the plugin.
The amount of words is configured in the datasource settings. In those settings is also important that you choose "Order by: Doc Count".

Every other settings for the wordcloud can be changed in the plugin options tab.


