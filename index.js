var postcss = require('postcss')
var random = require('random-js')()

module.exports = postcss.plugin('postcss-randomize', function (opts) {
  /*
     @randomize example 1-5
     @rand-props color blue,white,red
  */

  return function (css) {
    css.walk(function (target) {

      /* Breakout: introduce devtool here */
      if (target.type === 'atrule' && target.name === 'randomize') {
        var params = target.params.split(' ')
        var className = params[0]
        var range = params[1].split('-')
        var min = parseInt(range[0], 10)
        var max = parseInt(range[1], 10)
        var randomRules = []

        for (var i = min; i !== max + 1; i++) {
          var newRule = postcss.rule({
            selector: '.' + className + '-' + i,
            nodes: target.nodes
          })

          randomRules.push(newRule)
        }

        // debugger
        // use a debugger to show the randomRules array and nodes in devtool

        randomRules.forEach(function (randomRule) {
          randomRule.nodes = randomRule.nodes.map(function (childNode) {
            if (!(childNode.type === 'atrule' && childNode.name === 'rand-props')) {
              return childNode
            }

            var params = childNode.params.split(' ')
            var propertyName = params[0]
            var values = params[1].split(',')

            return postcss.decl({
              prop: propertyName,
              value: randomValue(values)
            })
          })
        })

        // debugger
        // use a debugger to show the child nodes in devtool to show that the randomizer
        // is working as intended

        target.replaceWith(randomRules)
      }

      // Refresh devtool a bunch, prove it's random!

    })
  }
})

function randomValue (values) {
  return values[random.integer(0, values.length - 1)]
}
