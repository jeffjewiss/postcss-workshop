var postcss = require('postcss');
var random = require("random-js")();

module.exports = postcss.plugin('postcss-randomize', function (opts) {
  var randName = 'randomize'
  var propsName = 'rand-props'

  /*
     @randomize example 1-5
     @rand-props color blue,white,red
  */



  return function (css) {
    css.walk(function (target) {

      if (isAtRule(target) && target.name === randName) {
        var params = target.params.split(' ')
        var className = params[0]
        var range = params[1].split('-')
        var min = parseInt(range[0])
        var max = parseInt(range[1])
        var randomRules = []

        for (var i = min; i !== max + 1; i++) {
          randomRules.push(postcss.rule({
            selector: '.' + className + '-' + i,
            nodes: target.nodes
          }))
        }

        randomRules.forEach(function(newNode) {
          newNode.nodes = newNode.nodes.map(function(childNode) {
            if (isAtRule(childNode) && childNode.name === propsName) {
              var params = childNode.params.split(' ')
              var propertyName = params[0]
              var values = params[1].split(',')
              return postcss.decl({
                prop: propertyName,
                value: randomValue(values)
              })
            }
          })
        })

        target.replaceWith(randomRules)
      }

    })
  }
})

function randomValue (values) {
  return values[random.integer(0, values.length - 1)]
}

function isAtRule (node) {
  return node.type === 'atrule'
}
