## Plotly plugin for GitBook
[![Build Status](https://travis-ci.org/piranna/gitbook-plugin-plotly.svg?branch=master)](https://travis-ci.org/piranna/gitbook-plugin-plotly)
[![NPM version](https://badge.fury.io/js/gitbook-plugin-plotly.svg)](http://badge.fury.io/js/gitbook-plugin-plotly)

Plugin for [GitBook](https://github.com/GitbookIO/gitbook) to render [Plotly](https://plot.ly) charts

This plugin is based on code from [gitbook-plugin-mermaid](https://github.com/JozoVilcek/gitbook-plugin-mermaid).

### How to install it?

You can use install via **NPM**:

```bash
npm install gitbook-plugin-plotly
```

And use it for your book with in the `book.json`:

```json
{
    "plugins": ["plotly"]
}
```

### How to use it?

There are two options how can be graph put into the gitbook.
To use ~~embedded~~ graph, put in your book block as:

```json
{% plotly %}
{
  "a": "b"
}
{% endplotly %}
```

Plugin will pick up block body and replace it with generated svg diagram.
To load graph ~~from file~~, put in your book block as:

```json
{% plotly src="./diagram.plotly" %}
{% endplotly %}
```
If not absolute, plugin will resolve path given in `src` attribute relative to the current book page,
load its content and generate svg diagram.
