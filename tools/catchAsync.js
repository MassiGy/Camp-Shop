const catchAsync = fn => {
    return function(req, res, next) {
        fn(req, res, next).catch(e => {
            console.log(e)
            return next(e)

        })
    }
}

module.exports = catchAsync