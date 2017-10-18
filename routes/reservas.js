var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.use((req, res, next) => {
    req.collection = req.db.collection('reservas');
    next();
});

router.get("/", (req, res, next) => {
    req.collection.find().toArray()
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).send({ err: "Error al leer reservas" });
        });
});

router.get("/:idusuario", (req, res, next) => {
    let id = req.params.idusuario;
    req.collection.findOne({ _idusuario: new ObjectID(id) }).toArray()
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send({ err: "reservas no encontrado" });
            }
        });
});

router.post("/", (req, res, next) => {
    let body = req.body;
    req.collection.insertOne(body)
        .then(result => {
            res.send({ success: true });
        }).catch(err => {
            res.send({ success: false });
        });
});

router.put("/:id", (req, res, next) => {
    let body = req.body;
    let id = new ObjectID(req.params.id);
    req.collection.updateOne({ _id: id }, { $set: body })
        .then(result => res.send({ success: true }))
        .catch(err => res.send({ success: false }));
});

router.delete("/:id", (req, res, next) => {
    let id = new ObjectID(req.params.id);
    req.collection.deleteOne({ _id: id })
        .then(result => res.send({ success: true }))
        .catch(err => res.send({ success: false }));
});

router.post("/:_id", (req, res, next) => {
    
        let id = new ObjectID(req.params.id);
        let body = req.body;
    
        req.collection.findOne({ id: _id }).then(doc => {
            if(doc){
              req.collection.insert(body)
              res.send({ success: true });
            }else{
              res.send({ success: false });
            }    
          }).catch(err => {
            res.send({ success: false });
          });
        });
        
module.exports = router;