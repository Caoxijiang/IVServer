var product = {
    addproductinfo:"insert into product_info(user_id,product_name,product_Instructions,product_details,product_img_url,product_thumimg_url,product_price) values(?,?,?,?,?,?,?)",
    dellproductinfo:"delete from product_info where product_img_url=?",
    selectAllproduct:"select * from product_info",
    updateproductByID:"updata product_info set product_name=?,product_Instructions=?,product_details=?,product_img_url=?,product_thumimg_url=?,product_price=? where product_img_url=?",
    selectpoducturlByID:"select product_img_url,product_thumimg_url from product_info where product_id=? "
}

module.exports=product;