const express = require('express');
// const uuid = require('uuid'); //for hardcode
const router = express.Router();
const Course = require('../../models/Courses');



// Gets all courses : database
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) throw Error('No items');

        res.status(200).json(courses);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// Gets All Courses : hardcode
// router.get('/', (req, res) => res.json(Course));



// Gets a single course: database
router.get('/:id', async (req, res) => {
    try {
        const courses = await Course.findById(req.params.id);
        if (!courses) throw Error('No items');

        res.status(200).json(courses);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// Get Single Course : hardcode
// router.get('/:id', (req, res) => {
//     const found = Course.some(course => course.id === parseInt(req.params.id));

//     if (found) {
//         res.json(Course.filter(course => course.id === parseInt(req.params.id)));
//     } else {
//         res.status(400).json({ msg: `No course with the id of ${req.params.id}` });
//     }
// });



// create course: database

router.post('/create', async (req, res) => {

    if (!req.body.name || !req.body.description || !req.body.points) {
        return res.status(400).send('Enter missing fields')
    }

    const newCourse = new Course({
        name: req.body.name,
        description: req.body.description,
        points: req.body.points
    });

    try {
        const course = await newCourse.save();
        if (!course) throw Error('Something went wrong saving the item');

        res.status(200).json(course);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// Create Course: hardcode
// router.post('/', (req, res) => {
//     const newCourse = {
//         id: uuid.v4(),
//         name: req.body.name,
//         description: req.body.description,
//         points: req.body.points
//     };

//     if (!newCourse.name || !newCourse.description || !newCourse.points || !newCourse.image || !newCourse.media) {
//         return res.status(400).json({ msg: 'Please enter all missing fields' });
//     }

//     Course.push(newCourse);

//     res.redirect('/');
//     res.json(Course);
// });


// update course: database
router.put('/:id', (req, res) => {

    Course.findOneAndUpdate({
        name: req.query.name,
        description: req.query.description,
        points: req.query.points
    }, req.body, {
        new: true
    })
        .then(Course => {
            res.json(Course)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Update Course: hard code
// router.put('/:id', (req, res) => {
//     const found = Course.some(course => course.id === parseInt(req.params.id));

//     if (found) {
//         const updatedCourse = req.body;
//         Course.forEach(course => {
//             if (course.id === parseInt(req.params.id)) {
//                 course.name = updatedCourse.name ? updatedCourse.name : course.name;
//                 course.description = updatedCourse.description ? updatedCourse.description : course.description;
//                 course.points = updatedCourse.points ? updatedCourse.points : course.points;
//                 course.image = updatedCourse.image ? updatedCourse.image : course.image;
//                 course.media = updatedCourse.media ? updatedCourse.media : course.media;

//                 res.json({ msg: 'Course updated', course });
//             }
//         });
//     } else {
//         res.status(400).json({ msg: `No course with the id of ${req.params.id}` });
//     }
// });




// delete course : database
router.delete('/:id', (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('Missing URL parameter: email')
    }

    Course.findOneAndRemove({
        id: req.query.id
    })
        .then(Course => {
            res.json(Course)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Delete Course: hard code
// router.delete('/:id', (req, res) => {
//     const found = courses.some(course => course.id === parseInt(req.params.id));

//     if (found) {
//         res.json({
//             msg: 'Course deleted',
//             courses: courses.filter(course => course.id !== parseInt(req.params.id))
//         });
//     } else {
//         res.status(400).json({ msg: `No course with the id of ${req.params.id}` });
//     }
// });

module.exports = router;