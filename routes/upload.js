const express  = require('express');
const router  = express.Router();
const path = require('path');
//const fileupload = require('express-fileupload')

//router.use(fileupload());

router.post('/saveImage', (req, res) => {
  const file = req.files.myFile;
  const fileName = req.files.myFile.name
  //const filePath = req.body.filePath;
  const imgPath = path.join(__dirname, '../pages/assets/products');//__dirname + '/images/' + fileName //'
  //const serverPath = '/' + imgPath + '/'+ filePath + '.jpg'; //files[0]
  const localPath = '/' + imgPath + '/' + fileName;
  const winPath = imgPath + '/' + fileName;
  const returnPath = '/images/products/' + fileName;
  //__dirname + '
   console.log(file);
  file.mv(winPath, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: returnPath }));
  })
})

router.post('/saveWarehouse', (req, res) => {
  const file = req.files.myFile;
  const fileName = req.files.myFile.name
  //const filePath = req.body.filePath;
  const imgPath = path.join(__dirname, '../pages/assets/warehouses');//__dirname + '/images/' + fileName //'
  //const serverPath = '/' + imgPath + '/'+ filePath + '.jpg'; //files[0]
  const localPath = '/' + imgPath + '/' + fileName;
  const winPath = imgPath + '/' + fileName;
  const returnPath = '/images/warehouses/' + fileName;
  //__dirname + '
   console.log(file);
  file.mv(winPath, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: returnPath }));
  })
})


module.exports = router;
