const express = require('express')
const router = express.Router()
const { createClient } = require('webdav')
const fs = require('fs')
const config = require('config')

const client = createClient('https://webdav.yandex.ru', {
    username: config.get('username'),
    password: config.get('password')
})

// @route   POST /md/:dir
// @desc    Создать директорий с именем. Если уже есть отпр 408 
router.post('/md/:dir', async (req, res) => {
    try {
        const dir = req.params.dir

        if (await client.exists(dir) === true) {
            return res.status(408).json({ msg: 'Already exists' })
        }

        await client.createDirectory(dir)

        res.json({ dir })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST /rd/:dir
// @desc    Удалить директорий, если не сущ -> 408
router.post('/rd/:dir', async (req, res) => {
    try {
        const dir = req.params.dir

        if (await client.exists(dir) === false) {
            return res.status(408).json({ msg: 'Dir is not exist' })
        }

        await client.deleteFile(dir)

        res.json({ dir })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST /up/:filename
// @desc    Принять файл и записать в ФХ под именем :filename -> при ошибке 408
router.post('/up/:filename', async (req, res) => {
    try {
        const filename = req.params.filename

        if (!req.files) {
            return res.status(408).json({ msg: 'File uploading error' })
        }
        const file = req.files.file

        await client.putFileContents(filename, file.data, { overwrite: true })

        res.json({ filename })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST /down/:filename
// @desc    Скачать файл из ФХ и выгрузить его клиенту -> при ошибке 404
router.post('/down/:filename', async (req, res) => {
    try {
        const filename = req.params.filename

        if (await client.exists(filename) === false) {
            return res.status(404).json({ msg: 'File does not exists' })
        }

        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        client.createReadStream(filename).pipe(res)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// @route   POST /del/:dir
// @desc    Удалить файл из ФХ -> при ошибке 404
router.post('/del/:filename', async (req, res) => {
    try {
        const filename = req.params.filename

        if (await client.exists(filename) === false) {
            return res.status(404).json({ msg: 'File does not exists' })
        }

        await client.deleteFile(filename)
        res.send({ filename })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// @route   POST /copy/:from/:to
// @desc    Копировать файл :from из ФХ в файл :to. Если не найден => 404, Если не может быть записан -> 408
router.post('/copy/:from/:to', async (req, res) => {
    try {
        const from = req.params.from
        const to = req.params.to


        if (await client.exists(from) === false) {
            return res.status(404).json({ msg: 'File does not exists' })
        }
        if (await client.exists(to) === false) {
            await client.createDirectory(to)
        }

        await client.copyFile(from, `/${to}/${from}`)

        res.json({
            from,
            to
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST /move/:from/:to
// @desc    Переместить файл :from из ФХ в файл :to. Если не найден => 404, Если не может быть записан -> 408
router.post('/move/:from/:to', async (req, res) => {
    try {
        const from = req.params.from
        const to = req.params.to


        if (await client.exists(from) === false) {
            return res.status(404).json({ msg: 'File does not exists' })
        }
        if (await client.exists(to) === false) {
            await client.createDirectory(to)
        }

        await client.moveFile(from, `/${to}/${from}`)

        res.json({
            from,
            to
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


module.exports = router

