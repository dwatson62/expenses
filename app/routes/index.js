var express = require('express');
var router = express.Router();              // get an instance of the express Router

// ROUTES FOR OUR API
// =============================================================================

router.get('/', function(req, res, next) {
  res.json({ 'message': 'Hello world' });
});

module.exports = router;
