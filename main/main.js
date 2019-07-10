'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
function printReceipt(inputs) {
    const countObject = countItem(inputs)
    console.log(caculatePromotions(countObject));
}
function countItem(inputs) {
    return inputs.reduce((acc, cur) => {
        if (cur.includes('-')) {
            let list = cur.split('-')
            acc[list[0]] = acc[list[0]] + Number(list[1]) || Number(list[1])
        }
        else {
            acc[cur] = ++acc[cur] || 1
        }
        return acc
    }, {});
}
function caculatePromotions(countObject) {
    const db = loadAllItems()
    const promotions = loadPromotions()
    let total = 0, discount = 0
    let result = '***<没钱赚商店>收据***\n'
    for (const key in countObject) {
        db.forEach(item => {
            if (key == item.barcode) {
                if (countObject[key] >= 3 && promotions[0].barcodes.includes(key)) {
                    discount += parseInt(countObject[key] / 3) * item.price
                    total += countObject[key] * item.price - parseInt(countObject[key] / 3) * item.price
                    result += `名称：${item.name}，数量：${countObject[key] + item.unit}，单价：${Number(item.price).toFixed(2)}(元)，小计：${(Number(countObject[key] - parseInt(countObject[key] / 3)) * item.price).toFixed(2)}(元)\n`
                }
                else {
                    total += countObject[key] * item.price
                    result += `名称：${item.name}，数量：${countObject[key] + item.unit}，单价：${Number(item.price).toFixed(2)}(元)，小计：${Number(countObject[key] * item.price).toFixed(2)}(元)\n`
                }
            }
        })
    }
    result += `----------------------\n总计：${total.toFixed(2)}(元)\n节省：${discount.toFixed(2)}(元)\n**********************`
    return result
}