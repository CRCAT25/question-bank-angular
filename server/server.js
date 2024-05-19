const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = 3000;
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Đường dẫn đến file JSON
const fileStatusPath = 'status.json';
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

// Cập nhật trạng thái của một câu hỏi
app.post('/updateQuestionStatus', (req, res) => {
    const { questionId, newStatus } = req.body;

    // Đọc nội dung từ tệp modules.json
    fs.readFile('modules.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }
        
        try {
            // Parse nội dung JSON
            const modules = JSON.parse(data);

            // Tìm và cập nhật trạng thái của câu hỏi có id tương ứng
            let found = false;
            for (const module of modules.Modules) {
                for (const category of module.moduleCategory) {
                    for (const subCategory of category.moduleCategory) {
                        const question = subCategory.data.find(q => q.id === questionId);
                        if (question) {
                            question.status = newStatus;
                            found = true;
                            break;
                        }
                    }
                    if (found) break;
                }
                if (found) break;
            }

            // Ghi lại nội dung cập nhật vào tệp modules.json
            fs.writeFile('modules.json', JSON.stringify(modules, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).json({ success: false, error: 'Internal server error' });
                    return;
                }
                
                // Trả về phản hồi thành công
                res.status(200).json({ success: true, message: `Successfully updated status of question with ID ${questionId} to ${newStatus}.` });
            });
        } catch (err) {
            console.error('Error parsing JSON:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    });
});

// Xóa một câu hỏi khỏi tệp JSON
app.post('/deleteQuestion', (req, res) => {
    const { questionId } = req.body;

    // Đọc nội dung từ tệp modules.json
    fs.readFile('modules.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }

        try {
            // Parse nội dung JSON
            let modules = JSON.parse(data);

            // Tìm và xóa câu hỏi có id tương ứng
            let found = false;
            for (const module of modules.Modules) {
                for (const category of module.moduleCategory) {
                    for (const subCategory of category.moduleCategory) {
                        const questionIndex = subCategory.data.findIndex(q => q.id === questionId);
                        if (questionIndex !== -1) {
                            subCategory.data.splice(questionIndex, 1);
                            found = true;
                            break;
                        }
                    }
                    if (found) break;
                }
                if (found) break;
            }

            // Ghi lại nội dung cập nhật vào tệp modules.json
            fs.writeFile('modules.json', JSON.stringify(modules, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).json({ success: false, error: 'Internal server error' });
                    return;
                }

                // Trả về phản hồi thành công
                res.status(200).json({ success: true, message: `Successfully deleted question with ID ${questionId}.` });
            });
        } catch (err) {
            console.error('Error parsing JSON:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    });
});

// Cập nhật trạng thái của nhiều câu hỏi
app.post('/updateManyQuestionStatus', (req, res) => {
    const { listQuestionId, newStatus } = req.body;

    // Đọc nội dung từ tệp modules.json
    fs.readFile('modules.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }
        
        try {
            // Parse nội dung JSON
            let modules = JSON.parse(data);

            // Duyệt qua danh sách các ID câu hỏi và cập nhật trạng thái cho mỗi câu hỏi
            for (const questionId of listQuestionId) {
                let found = false;
                for (const module of modules.Modules) {
                    for (const category of module.moduleCategory) {
                        for (const subCategory of category.moduleCategory) {
                            const question = subCategory.data.find(q => q.id === questionId);
                            if (question) {
                                question.status = newStatus;
                                found = true;
                                break;
                            }
                        }
                        if (found) break;
                    }
                    if (found) break;
                }
            }

            // Ghi lại nội dung cập nhật vào tệp modules.json
            fs.writeFile('modules.json', JSON.stringify(modules, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).json({ success: false, error: 'Internal server error' });
                    return;
                }
                
                // Trả về phản hồi thành công
                res.status(200).json({ success: true, message: `Successfully updated status of questions to ${newStatus}.` });
            });
        } catch (err) {
            console.error('Error parsing JSON:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    });
});

// Xóa nhiều câu hỏi khỏi tệp JSON
app.post('/deleteManyQuestions', (req, res) => {
    const { listQuestionId } = req.body;

    // Đọc nội dung từ tệp modules.json
    fs.readFile('modules.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }

        try {
            // Parse nội dung JSON
            let modules = JSON.parse(data);

            // Duyệt qua danh sách các ID câu hỏi và xóa từng câu hỏi
            for (const questionId of listQuestionId) {
                let found = false;
                for (const module of modules.Modules) {
                    for (const category of module.moduleCategory) {
                        for (const subCategory of category.moduleCategory) {
                            const questionIndex = subCategory.data.findIndex(q => q.id === questionId);
                            if (questionIndex !== -1) {
                                subCategory.data.splice(questionIndex, 1);
                                found = true;
                                break;
                            }
                        }
                        if (found) break;
                    }
                    if (found) break;
                }
            }

            // Ghi lại nội dung cập nhật vào tệp modules.json
            fs.writeFile('modules.json', JSON.stringify(modules, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).json({ success: false, error: 'Internal server error' });
                    return;
                }

                // Trả về phản hồi thành công
                res.status(200).json({ success: true, message: `Successfully deleted ${listQuestionId.length} questions.` });
            });
        } catch (err) {
            console.error('Error parsing JSON:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    });
});

// Tạo API để thêm một mục dữ liệu mới vào tệp JSON
app.post('/addQuestion', (req, res) => {
    const newQuestion = req.body; // Dữ liệu của mục dữ liệu mới cần thêm

    // Đọc dữ liệu từ tệp modules.json
    fs.readFile('modules.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }

        try {
            // Parse nội dung JSON
            let modules = JSON.parse(data);

            // Tìm module chứa danh sách câu hỏi
            const nhansuModule = modules.Modules.find(module => module.link === '/nhan-su');
            if (!nhansuModule) {
                res.status(404).json({ success: false, error: 'Nhân sự module not found' });
                return;
            }

            const nganhangModuleCategory = nhansuModule.moduleCategory.find(category => category.nameModuleCategory === 'Đánh giá nhân sự');
            if (!nganhangModuleCategory) {
                res.status(404).json({ success: false, error: 'Ngân hàng câu hỏi category not found' });
                return;
            }

            const nganhangSubModuleCategory = nganhangModuleCategory.moduleCategory.find(subCategory => subCategory.nameSubModuleCategory === 'Ngân hàng câu hỏi');
            if (!nganhangSubModuleCategory) {
                res.status(404).json({ success: false, error: 'Ngân hàng câu hỏi sub category not found' });
                return;
            }

            // Thêm mục dữ liệu mới vào danh sách câu hỏi
            nganhangSubModuleCategory.data.unshift(newQuestion);

            // Ghi lại nội dung cập nhật vào tệp modules.json
            fs.writeFile('modules.json', JSON.stringify(modules, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).json({ success: false, error: 'Internal server error' });
                    return;
                }

                // Trả về phản hồi thành công
                res.status(200).json({ success: true, message: 'Successfully added new question.' });
            });
        } catch (err) {
            console.error('Error parsing JSON:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    });
});

// Tạo API để cập nhật một mục dữ liệu theo id câu hỏi
app.post('/updateQuestion/:questionId', (req, res) => {
    const questionId = req.params.questionId;
    const updatedQuestion = req.body; // Dữ liệu cập nhật của câu hỏi

    // Đọc dữ liệu từ tệp modules.json
    fs.readFile('modules.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }

        try {
            // Parse nội dung JSON
            let modules = JSON.parse(data);

            // Tìm câu hỏi có id tương ứng và cập nhật dữ liệu
            let found = false;
            for (const module of modules.Modules) {
                for (const category of module.moduleCategory) {
                    for (const subCategory of category.moduleCategory) {
                        const question = subCategory.data.find(q => q.id === questionId);
                        if (question) {
                            Object.assign(question, updatedQuestion);
                            found = true;
                            break;
                        }
                    }
                    if (found) break;
                }
                if (found) break;
            }

            // Ghi lại nội dung cập nhật vào tệp modules.json
            fs.writeFile('modules.json', JSON.stringify(modules, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).json({ success: false, error: 'Internal server error' });
                    return;
                }

                // Trả về phản hồi thành công
                res.status(200).json({ success: true, message: `Successfully updated question with ID ${questionId}.` });
            });
        } catch (err) {
            console.error('Error parsing JSON:', err);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    });
});




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
