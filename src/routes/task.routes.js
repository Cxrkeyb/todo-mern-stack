const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks)
});
router.get('/:id', async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    console.log(tasks);
    res.json(tasks)
});

router.post('/', async (req, res) => {
    const {title, description} = req.body;
    const task = new Task({title, description})
    await task.save();
    res.json({status: 'Task saved successfully'});
})

router.put('/:id', async (req, res) => {
    const {title, description} = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task updated successfully'});
})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task deleted successfully'});
})

module.exports = router;