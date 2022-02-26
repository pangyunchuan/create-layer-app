function randomNum(minNum = 0, maxNum = 10) {
    switch (arguments.length) {
        case 1:
            return parseInt(`${Math.random() * minNum + 1}`, 10);
            break;
        case 2:
            return parseInt(`${Math.random() * (maxNum - minNum + 1) + minNum}`, 10);
            break;
        default:
            return 0;
            break;
    }
}

// const c = ["德阳", "绵阳",""]

// const mockjs = require('mockjs')
//
// console.log(mockjs)


module.exports = {
    chlname: randomNum(0,10),
}
// module.exports = function (test:string){
//
// }
