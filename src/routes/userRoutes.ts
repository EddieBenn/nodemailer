import express from 'express'
import {createUser, verifyUser} from '../controllers/user'

const router = express.Router()

router.post('/signup', createUser)
router.post('/verify/:id', verifyUser)


export default router;