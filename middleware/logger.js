const logger = (req, res, next) => {
    req.hello = "hello middlewareee";
    console.log("middleware");
    console.log(req.method);
    next();
}
module.exports = logger;