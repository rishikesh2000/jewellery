const multer=require('multer');
const storage=multer.diskStorage({});

const upload=multer({storage}).array('jewllery',5);

module.exports= upload;