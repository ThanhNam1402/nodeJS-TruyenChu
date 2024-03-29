


import serviceApprove from '../services/serviceApprove.js'

// BOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const handelGetBookNotApproved = async (req, res) => {
    try {

        console.log(req.query);
        let data = await serviceApprove.getAllBook(req.query);
        return res.status(200).json({
            data: data.data,
            _pagination: data.pagination,
            EC: data.EC,
            EM: data.EM
        })

    } catch (error) {
        console.log(error)
    }
}



let handelGetBookNotApprovedByID = async (req, res) => {
    try {
        let data = await serviceApprove.getBookByID(req.params.id);
        console.log('data', data);
        return res.status(200).json({
            data: data.data,
            chapters: data.chapter,
            EC: data.EC,
            EM: data.EM
        })


    } catch (error) {
        console.log(error)
    }
}


let handelPublishBook = async (req, res) => {
    try {

        let reqData = req.body
        let data = await serviceApprove.publishBook(reqData);
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM
        })
    } catch (error) {

    }
}





module.exports = {
    handelGetBookNotApproved: handelGetBookNotApproved,
    handelGetBookNotApprovedByID: handelGetBookNotApprovedByID,
    handelPublishBook: handelPublishBook

}