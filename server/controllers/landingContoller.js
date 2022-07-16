module.exports.helloWorld1 = (req, res, next) => {
    res.send("Hello World");
    next()
}

module.exports.helloWorld2 = (req, res, next) => {
    res.send("Hello World");
    next()
}
