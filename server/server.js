const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = 3000;
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Đường dẫn đến file JSON
const fileStatusPath = 'data.json';
const fileModulePath = 'modules.json';

// Xử lý yêu cầu GET từ Angular và trả về dữ liệu JSON các status
app.get('/api/status', (req, res) => {
    fs.readFile(fileStatusPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            // Parse dữ liệu JSON
            const jsonData = JSON.parse(data);
            // Trả về dữ liệu JSON cho Angular
            res.json(jsonData.Status);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Xử lý yêu cầu GET từ Angular và trả về dữ liệu JSON các modules
app.get('/api/modules', (req, res) => {
    fs.readFile(fileModulePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            // Parse dữ liệu JSON
            const jsonData = JSON.parse(data);
            // Trả về dữ liệu JSON cho Angular
            res.json(jsonData.Modules);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Xử lý yêu cầu GET các cateModule từ 1 module
app.get('/api/:module', (req, res) => {
    const moduleToFind = req.params.module;
    fs.readFile(fileModulePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {

            // console.log(moduleToFind)
            // Parse dữ liệu JSON
            const jsonData = JSON.parse(data).Modules;
            const foundModule = jsonData.find(element => moduleToFind === element.link.split('/')[1]);
            if (foundModule) {
                // Trả về dữ liệu JSON cho Angular
                // console.log(foundModule)
                res.json(foundModule);
            } else {
                // Nếu không tìm thấy module, trả về lỗi 404
                res.status(404).json({ error: 'Module not found' });
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Xử lý yêu cầu GET các cateModule từ 1 module
app.get('/api/:module/:sub', (req, res) => {
    const moduleToFind = req.params.module;
    const subToFind = req.params.sub;
    fs.readFile(fileModulePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            // Parse dữ liệu JSON
            const jsonData = JSON.parse(data).Modules;
            const foundModule = jsonData.find(element => moduleToFind === element.link.split('/')[1]);
            if (foundModule) {
                const listCate = foundModule.moduleCategory;
                const foundSub = listCate.find(moduleCategory => {
                    if (moduleCategory.moduleCategory) {
                        const subModule = moduleCategory.moduleCategory.find(subModule => subModule.link === '/' + subToFind);
                        return subModule
                        // return subModule.find(sub => sub.link === '/' + subToFind);
                    }
                    return false;
                });
                res.json(foundSub.moduleCategory.find(sub => sub.link === '/' + subToFind));
            } else {
                // Nếu không tìm thấy module, trả về lỗi 404
                res.status(404).json({ error: 'Module not found' });
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
