const path = require('path'),
    passport = require('passport'),
    express = require('express'),
    bodyParser = require('body-parser'),
    {
        users,
        instructors,
        students,
        courses,
        lectures,
        questions,
        answers,
    } = require('./routes/api');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
//==========================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//==========================================================================
app.use(passport.initialize());
require('./config/passport')(passport);
//==========================================================================
// app.use("/instructor/dashboard", InstDashBRoutes);
//==========================================================================
app.use('/api/users', users);
app.use('/api/instructors', instructors);
app.use('/api/students', students);
app.use('/api/courses', courses);
app.use('/api/lectures', lectures);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
//==========================================================================
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Server Online on port ${port}...`));
