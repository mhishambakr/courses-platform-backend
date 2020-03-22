const express = require('express');
// const uuid = require('uuid'); //for hardcode
const router = express.Router();
const Category = require('../../models/Categories');

// Gets all categories : database
router.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      if (!categories) throw Error('No items');
  
      res.status(200).json(categories);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

// Gets All categories : hardcode
// router.get('/', (req, res) => res.json(Category));






// Get single category : database
router.get('/:id', async (req, res) => {
    try {
      const categories = await Category.findById(req.params.id);
      if (!categories) throw Error('No items');
  
      res.status(200).json(categories);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

// Get Single Category: hard code
// router.get('/:id', (req, res) => {
//     const found = Category.some(category => category.id === parseInt(req.params.id));

//     if (found) {
//         res.json(Category.filter(category => category.id === parseInt(req.params.id)));
//     } else {
//         res.status(400).json({ msg: `No category with the id of ${req.params.id}` });
//     }
// });



// create category: database

router.post('/', async (req, res) => {
    if(!req.body.name) {
        return res.status(400).send('Enter name')
      }

    const newCategory = new Category({
      name: req.body.name,
    });
  
    try {
      const category = await newCategory.save();
      if (!category) throw Error('Something went wrong saving the item');
  
      res.status(200).json(category);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

// Create Category:hard code
// router.post('/', (req, res) => {
//     const newCategory = {
//         id: uuid.v4(),
//         name: req.body.name
//     };

//     if (!newCategory.name) {
//         return res.status(400).json({ msg: 'Please enter name' });
//     }

//     Category.push(newCategory);

//     res.redirect('/');
//     res.json(Category);
// });






// update category: database
router.put('/:id', (req, res) => {

    Category.findOneAndUpdate({
        name: req.query.name
    }, req.body, {
        new: true
    })
        .then(Category => {
            res.json(Category)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Update Category: hard code
// router.put('/:id', (req, res) => {
//     const found = categories.some(category => category.id === parseInt(req.params.id));

//     if (found) {
//         const updatedCategory = req.body;
//         categories.forEach(category => {
//             if (category.id === parseInt(req.params.id)) {
//                 category.name = updatedCategory.name ? updatedCategory.name : category.name;

//                 res.json({ msg: 'Category updated', category });
//             }
//         });
//     } else {
//         res.status(400).json({ msg: `No category with the id of ${req.params.id}` });
//     }
// });




// delete: database
router.delete('/:id', (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('Missing URL parameter: email')
    }

    Category.findOneAndRemove({
        id: req.query.id
    })
        .then(Category => {
            res.json(Category)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


// Delete Category: hard code
router.delete('/:id', (req, res) => {
    const found = categories.some(category => category.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Category deleted',
            categories: categories.filter(category => category.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No category with the id of ${req.params.id}` });
    }
});

module.exports = router;