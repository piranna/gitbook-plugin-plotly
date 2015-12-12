#!/usr/bin/env node

var process = require('./index').blocks.plotly.process


const data =
[
  {
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]
  }
]


var block =
{
  body: JSON.stringify(data),
  kwargs: {}
}

process(block).then(function(divCode)
{
  console.log(divCode)
})
