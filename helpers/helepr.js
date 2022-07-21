function currency(values){
    return values.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
}
module.exports = {currency}