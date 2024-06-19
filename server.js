const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const blogFilePath = './blogs.json';

// Read blogs from file
function readBlogs() {
    if (!fs.existsSync(blogFilePath)) {
        fs.writeFileSync(blogFilePath, '[]');
    }
    const data = fs.readFileSync(blogFilePath);
    return JSON.parse(data);
}

// Save blogs to file
function saveBlogs(blogs) {
    fs.writeFileSync(blogFilePath, JSON.stringify(blogs, null, 2));
}

// Get all blogs
app.get('/api/blogs', (req, res) => {
    const blogs = readBlogs();
    res.json(blogs);
});

// Post a new blog
app.post('/api/blogs', (req, res) => {
    const blogs = readBlogs();
    const newBlog = req.body;
    blogs.push(newBlog);
    saveBlogs(blogs);
    res.json(newBlog);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
