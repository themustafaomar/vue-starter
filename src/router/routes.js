import { base } from './routes/base'
import { auth } from './routes/auth'
import { account } from './routes/account'

export default [...base, ...auth, ...account]
