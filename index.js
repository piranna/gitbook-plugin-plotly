var path         = require('path');
var readFileSync = require('fs').readFileSync;
var url          = require('url');

var phantom = require('phantom');


//const PHANTOMJS_MODULE = require.resolve('phantomjs')
//const PHANTOMJS_BIN = path.resolve(PHANTOMJS_MODULE, '../../bin', 'phantomjs')


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

        return render(body).then(function(divCode)
        {
          // Assign an unique chart ID
          return divCode.replace(/plotlyChart1/g, getId())
        })
      }
    }
  }
}


function render(plotlyCode, callback)
{
  return new Promise(function(resolve, reject)
  {
    phantom.create(function(ph)
//    phantom.create({binary: PHANTOMJS_BIN}, function(ph)
    {
      ph.createPage(function(page)
      {
        var htmlPagePath = path.join(__dirname, 'converter.html')

        page.open(htmlPagePath, function(status)
        {
          if(status === 'fail') return reject()

          page.evaluate(
            // On the HTML page
            function(code)
            {
              return renderToSvg(code)
            },
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


function s4()
{
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function getId()
{
  return "plotlyChart-" + s4() + s4();
}
