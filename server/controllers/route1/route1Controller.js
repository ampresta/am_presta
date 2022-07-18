module.exports.func1 = (req, res, next) => {
    res.send("route1");
    next()
}

module.exports.func2 = (req, res, next) => {
    res.send("route1/sub_route1")
    next()
}

module.exports.func3 = (req, res, next) => {
    res.send("route1/sub_route2")
    next()
}