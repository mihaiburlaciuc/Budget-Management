const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const User = require("../models/users");
const Conflict = require("../models/conflict");
const Vendor = require("../models/vendor");

const client = require('prom-client');
const userLoginMetric = new client.Counter({
  name: 'metric_all_user_login',
  help: 'metric_help',
});

exports.user_register = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let balance = req.body.balance;

    console.log("Req.body: " + JSON.stringify(req.body));
    console.log("Req body " + username + " " + password + " " + balance);
    console.log("register/ called ");

    User.find({ username: username })
    .exec()
    .then(user => {
        // Verify if the username is already in use
        if (user.length >= 1) {
            return res.status(209).json({
                message: "Username already exists"
            });
        } else {
            const user = new User({
                username: username,
                password: password,
                balance: balance
            });
            
            user.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "User created"
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

exports.user_login =  (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log("/login");
    console.log("Req.body: " + JSON.stringify(req.body));
    console.log("Req body " + username + " " + password);
    userLoginMetric.inc();
    
    User.find({ username: req.body.username })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(409).json({
                message: "Auth failed"
            });
        }
        
        const jwtKey = "JWT_SECRET_BUGET_APP";
        if (user[0].password === req.body.password) {
            const token = jwt.sign(
                {
                    username: username
                },
                jwtKey
            );

            return res.status(200).json({
                message: "Auth successful",
                token: token,
                balance: user[0].balance
            });
        } else {
            res.status(201).json({
                message: "Auth failed"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.getBalance =  (req, res, next) => {
    let username = req.userData;
    console.log("/getBalance", req.body);

    User.find({ username: username })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        
        return res.status(200).json({
            message: "Auth successful",
            balance: user[0].balance
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.getAll = (req, res, next) => {
    console.log("/getAll was called ");

    User.find()
    .select("username password")
    .exec()
    .then(docs => {
        console.log("getAll/ request: Users", docs);

        res.status(201).json({
            users: docs
        })
    })
    .catch(err => {
        console.log("getAll/ ", err);

        res.status(500).json({
            error: err
          });
    });
}

async function modifyUserBalance(username, balanceModifier) {
    return User.find({username: username})
    .exec()
    .then(docs => {
        if (docs.length < 1) {
            throw "Username does not exist";
        }

        console.log("user doc ", docs[0]);

        let currentBalance = parseInt(docs[0].balance);
        currentBalance += balanceModifier;

        // Update with new balance
        return User.update({username: username}, {balance: currentBalance}).exec()
        .then(() => {
            return currentBalance;
        }).catch(err => {
            console.log("User.update({username: username}, {balance = currentBalance})/ ", err);
    
            throw err;
        });
    })
    .catch(err => {
        console.log("modifyUserBalance/ ", err);

        throw err;
    });
}

async function modifyVendorAmountToReceive(vendorName, increasedAmountToReceive) {
    return Vendor.find({name: vendorName})
    .exec()
    .then(docs => {
        if (docs.length < 1) {
            throw "Vendor does not exist";
        }

        console.log("user doc ", docs[0]);

        var amountToReceive = parseInt(docs[0].amountToReceive);
        console.log("updating " + vendorName + "by increasing " 
        + amountToReceive + " with " + increasedAmountToReceive );

        amountToReceive += increasedAmountToReceive;


        // Update with new balance
        return Vendor.update({name: vendorName}, {amountToReceive: amountToReceive}).exec()
        .then(() => {
            return amountToReceive;
        }).catch(err => {
            console.log("User.update({name: vendorName}, {amountToReceive: amountToReceive})", err);
    
            throw err;
        });
    })
}

exports.modifyBalance = (req, res, next) => {
    console.log("/modifyBalance was called ", req.body);
    let username = req.userData;
    let balanceModifier = req.body.balanceModifier * 1;

    modifyUserBalance(username, balanceModifier)
    .then(newBalance => {
        console.log("newBalance" + newBalance);
        return res.status(201).json({
            newBalance: newBalance
        })
    })
    .catch(err => {
        console.log("modifyBalance/ ", err);

        res.status(500).json({
            error: err
          });
    });
}

async function upsertConflict(srcEntity, dstEntity, srcType, dstType, srcOwedAmount) {
    Conflict.find({srcEntity: srcEntity, dstEntity: dstEntity})
    .exec()
    .then(docs => {
        // Conflict does not exist => Create
        if (docs.length < 1) {
            console.log("Creating Conflict between src: " + srcEntity + " and dst: " + dstEntity);
            let conflict = new Conflict({
                srcEntity: srcEntity,
                dstEntity: dstEntity,
                srcType: srcType,
                dstType: dstType,
                srcOwedAmount: srcOwedAmount
            });

            conflict.save()
            .catch(err => {
                throw err
            });
        } else {
            let doc = docs[0];
            let newSrcOwedAmount = doc.srcOwedAmount + srcOwedAmount;

            Conflict.update(
                {srcEntity: srcEntity, dstEntity: dstEntity}, 
                {srcOwedAmount: newSrcOwedAmount}
            )
            .exec()
            .catch(err => {
                throw err
            });
        }
    })
    .catch(err => {
        throw err
    });   
}

async function addTwinConflicts(srcEntity, dstEntity, srcType, dstType, srcOwedAmount) {
    srcOwedAmount = 1 * srcOwedAmount;
    await upsertConflict(srcEntity, dstEntity, srcType, dstType, srcOwedAmount)
    .catch(err => {
        throw err
    });

    // Add mirror conflict
    await upsertConflict(dstEntity, srcEntity, dstType, srcType, (-1) * srcOwedAmount)
    .catch(err => {
        throw err
    });
}

exports.addConflict = (req, res, next) => {
    console.log("/addConflict was called ", req.body);
    // 1 = LENDING, 2 = BORROWING, 3 = VENDOR_OWEING, 4 = VENDOR_SETTLING
    let operation = req.body.operation;
    let srcEntity = req.body.srcEntity;
    let dstEntity = req.body.dstEntity;
    let srcOwedAmount = req.body.srcOwedAmount;
    let srcType = "user";
    let dstType;

    if (srcEntity === dstEntity) {
        return res.status(209).json({
            message: "Can not lend to/borrow from yourself"
        }); 
    }

    if (operation === 1) {
        dstType = "user";
        // The user does not owe money when lending
        srcOwedAmount = (-1) * srcOwedAmount;
    } else if (operation === 2) {
        dstType = "user";
    } else if (operation === 3) {
        dstType = "vendor";
    } else if (operation === 4) {
        dstType = "vendor";
        // The user does not owe money when settling
        srcOwedAmount = (-1) * srcOwedAmount;
    }

    addTwinConflicts(srcEntity, dstEntity, srcType, dstType, srcOwedAmount)
    .then(() => {
        res.status(201).json({
            message: "Added conflict successful"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });

    // Modify balance
    if (srcType === "user" && dstType === "user") {
        let srcBalanceModifier = srcOwedAmount * 1;
        let dstBalanceModifier = srcOwedAmount * (-1);
    
        console.log("modifying balance for " + srcEntity + " by adding " + srcBalanceModifier);
        console.log("modifying balance for " + dstEntity + " by adding " + dstBalanceModifier);
        modifyUserBalance(srcEntity, srcBalanceModifier);
        modifyUserBalance(dstEntity, dstBalanceModifier);
    } else if (srcType === "user" && dstType === "vendor") {
        let dstIncreaseAmountToReceive = srcOwedAmount * 1;

        console.log("Modifing vendor dstIncreaseAmountToReceive");
        modifyVendorAmountToReceive(dstEntity, dstIncreaseAmountToReceive);
    }
}

// Conflict = status between 2 users
exports.getEntityConflicts = (req, res, next) => {
    console.log("/getUserConflicts was called ");
    let srcEntity = req.body.srcEntity;

    Conflict.find({srcEntity: srcEntity})
    .exec()
    .then(docs => {
        res.status(201).json({
            conflicts: docs
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });
}

exports.getEntityTransaction = (req, res, next) => {
    console.log("/getEntityTransaction was called ", req.body);
    let srcEntity = req.body.srcEntity;
    let transactions = []

    Conflict.find({srcEntity: srcEntity})
    .exec()
    .then(docs => {
        docs.forEach( doc => {
            console.log("doc: ", doc);
            // Conflict in settled
            if (doc.amount === 0) {
                console.log("Skipping conflict :" + srcEntity + " " + doc.dstEntity + " " + amount);
                return;
            }

            let operation;
            let displayedAmount = doc.srcOwedAmount;
            let operationType;

            if (doc.srcOwedAmount > 0 && doc.dstType === 'vendor') {
                operation = "OWED TO";
                operationType = 3;
            } else if (doc.srcOwedAmount > 0) {
                operation = "BORROWED FROM";
                operationType = 2;
            } else {
                operation = "LENT TO";
                operationType = 1;
                displayedAmount *= (-1);
            }

            let transaction = {
                operation: operation,
                operationType: operationType,
                dstEntity: doc.dstEntity,
                amount: displayedAmount
            };
            console.log("Transaction: ", transaction);
            transactions.push(transaction);
        });

        return res.status(201).json({
            transactions: transactions
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });
}