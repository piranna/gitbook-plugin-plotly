var path         = require('path');
var readFileSync = require('fs').readFileSync;
var url          = require('url');

var phantom = require('phantom');


const PHANTOMJS_MODULE = require.resolve('phantomjs')
const PHANTOMJS_BIN = path.resolve(PHANTOMJS_MODULE, '../../bin', 'phantomjs')


module.exports = {
  blocks: {
    plotly: {
      process: function(block) {
        var body = block.body;

        var src = block.kwargs.src;
        if(src) {
          var relativeSrcPath = decodeURI(url.resolve(this.ctx.file.path, src))
          var absoluteSrcPath = path.resolve(this.book.root, relativeSrcPath)

          body = readFileSync(absoluteSrcPath, 'utf8')
        }

        return convertToSvg(body).then(function(svgCode)
        {
          return svgCode.replace(/plotlyChart1/g, getId())
        })
      }
    }
  }
}

function convertToSvg(plotlyCode, callback)
{
  return Promise(function(resolve, reject)
  {
    phantom.create({binary: PHANTOMJS_BIN}, function(ph)
    {
      ph.createPage(function(page)
      {
        var htmlPagePath = path.join(__dirname, 'converter.html')

        page.open(htmlPagePath, function(status)
        {
          if(status === 'fail') return reject()

          page.evaluate(
            renderToSvg,
            function(result)
            {
              ph.exit()

              resolve(result)
            },
            plotlyCode)
        })
      })
    })
  })
}

function getId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return "plotlyChart-" + s4() + s4();
}
