const express = require('express')

const Adopter = require('./adopters-model')

const router = express.Router()

// this route kinds in for requests that start with /api/adopters

router.get('/', (req, res) => {
    Adopter.find(req.query)
      .then(adopters => {
        res.status(200).json(adopters);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the adopters',
        });
      });
  });
  
  router.get('/:id', (req, res) => {
    Adopter.findById(req.params.id)
      .then(adopter => {
        if (adopter) {
          res.status(200).json(adopter);
        } else {
          res.status(404).json({ message: 'Adopter not found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the adopter',
        });
      });
  });
  
  router.get('/:id/dogs', async (req, res) => {
    try {
        //here
        
    } catch (err) {
        res.status(500).json({
            // not good for production, clients don't need to or shouldn't see what the error is.
            // message: err.message,

            // use a custom message like this.
            message: 'something went wrong!',
        })
    }
  });
  
  router.post('/', (req, res) => {
    Adopter.add(req.body)
      .then(adopter => {
        res.status(201).json(adopter);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the adopter',
        });
      });
  });
  
  router.delete('/:id', (req, res) => {
    Adopter.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The adopter has been nuked' });
        } else {
          res.status(404).json({ message: 'The adopter could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the adopter',
        });
      });
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    Adopter.update(req.params.id, changes)
      .then(adopter => {
        if (adopter) {
          res.status(200).json(adopter);
        } else {
          res.status(404).json({ message: 'The adopter could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the adopter',
        });
      });
  });

  module.exports = router