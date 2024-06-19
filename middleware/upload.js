const multer=require('multer');
const storage=multer.diskStorage({});

const upload=multer({storage}).array('jewellery',10);

module.exports= upload;