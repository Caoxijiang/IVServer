var invoice={
    insertinvoiceInfo:"insert into invoice_info(invoice_type,invoice_head,invoice_rec,invoice_content,invoice_amount,invoice_info,invoice_recipient,invoice_phoneNum,invoice_address,invoice_status,Identity_info) values(?,?,?,?,?,?,?,?,?,0,?)",
    selectAllnvoiceInfo:"select * from invoice_info",
    selectinvoiceBystatus:"select * from invoice_info where invoice_status=?",
    updatainvoiceinfostatus:"update invoice_info set invoice_status=? where invoice_id=?",
    selectpersonalstatus:"select invoice_status from invoice_info where Identity_info=?"
};
module.exports = invoice;