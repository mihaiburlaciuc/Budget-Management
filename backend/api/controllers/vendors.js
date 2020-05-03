const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const Vendor = require("../models/vendor");

const client = require('prom-client');
const vendorsMetric = new client.Counter({
    name: 'nodeMetric_all_vendors',
    help: 'metric_help',
});

exports.addVendor = (req, res, next) => {
    let vendorName = req.body.vendorName;
    vendorsMetric.inc();
    
    console.log("addVendor", vendorName.body);

    Vendor.find({name: vendorName})
    .exec()
    .then(vendors => {
        if (vendors.length >= 1) {
            return res.status(209).json({
                message: "Vendor already exists"
            });
        } else {
            const vendor = new Vendor({
                name: vendorName,
                amountToReceive: 0
            });

            vendor.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Vendor added"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                }); 
            });
        }
    })
};

exports.addVendor2 = (req, res, next) => {
    console.log("/addVendor2 was called ", req.body);
    let vendorName = req.body.vendorName;

    Vendor.find({name: vendorName})
    .exec()
    .then(vendors => {
        if (vendors.length >= 1) {
            return res.status(209).json({
                message: "Vendor already exists"
            });
        } else {
            const vendor = new Vendor({
                name: vendorName,
                amountToReceive: 0
            });

            vendor.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Vendor added"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                }); 
            });
        }
    })
}

exports.getVendors = (req, res, next) => {
    console.log("/getVendors was called ");

    Vendor.find()
    .select("name amountToReceive")
    .then(vendors => {
        res.status(201).json({
            vendors: vendors
        })
    })
    .catch(err => {
        console.log("getVendors err ", err);

        res.status(500).json({
            error: err
          });
    });
};