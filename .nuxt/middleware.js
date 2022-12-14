const middleware = {}

middleware['check_auth'] = require('../middleware/check_auth.js')
middleware['check_auth'] = middleware['check_auth'].default || middleware['check_auth']

export default middleware
