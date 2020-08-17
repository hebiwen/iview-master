
module.exports = {
    uploadSingle(req,res,next){
        try {
            res.send(req.file.path);
        } catch (error) {
            logger.log("");
        }
    },
    uploadMulter(req,res,next){
        try {
            res.send(req.files[0].path);
        } catch (error) {
            logger.log("");
        }
    }
}


