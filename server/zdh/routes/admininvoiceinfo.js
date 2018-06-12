var express = require('express');
var router = express.Router();
var invoiceDao=require('../dao/invoiceDao');
router.all("/selectAll",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        invoiceDao.selectallinvoiceInfo(function(data){
            if(data){
                res.send(data)
            }else{
                res.send({msg:"ERR"})
            }
        })
    }
})

router.all("/selectStatus",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var status=req.query.status;
        invoiceDao.selectinvoiceBystatus(status,function(data){
            if(data){
                res.send(data)
            }else{
                res.send({msg:"ERR"})
            }
        })
    }
})


router.all("/updataStatus",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var invoice={};
        invoice.status=req.query.status;
        invoice.ID=req.query.ID;
        invoiceDao.updateinvoicestatus(invoice,function(data){
            if(data){
                res.send(data)
            } else{
                res.send({msg:"ERR"})
            }
        })
    }
})



module.exports = router;