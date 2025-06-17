const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let items = [];

app.get('/', (req, res) => {
    const { priority } = req.query;
    let filteredItems = items;
    if (priority) {
        filteredItems = items.filter(item => item.priority === priority);
    }
    res.render("list", { ejes: filteredItems });
});

app.post('/', (req, res) => {
    const task = req.body.todo.trim();
    const priority = req.body.priority;

    if (task.length === 0) {
        return res.send('<script>alert("Task cannot be empty!"); window.location.href="/";</script>');
    }

    items.push({ task, priority });
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const index = req.params.id;
    items.splice(index, 1);
    res.redirect('/');
});

app.post('/edit/:id', (req, res) => {
    const index = req.params.id;
    res.render("edit", {
        index: index,
        task: items[index].task,
        priority: items[index].priority
    });

});

app.post('/update/:id', (req, res) => {
    const index = req.params.id;
    items[index] = {
        task: req.body.task.trim(),
        priority: req.body.priority
    };
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
