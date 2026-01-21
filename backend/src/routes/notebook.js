import express from 'express'
import Notebook from "../models/Notebook.js"

const router = express.Router()

router.post('/', async (req, res) => {
    const { name } = req.body
    const nb = await Notebook.create({ name })
    res.json(nb)
})
router.get('/:id', async (req, res) => {
    const nb = await Notebook.findById(req.params.id)
    if (!nb) return res.status(404).json({ error: 'not found' })
    res.json(nb)
})
export default router
