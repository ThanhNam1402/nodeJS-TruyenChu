


import serveiceCreater from '../services/serveiceCreater';

// BOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const createrGetBooks = async (req, res) => {
    try {
        let data = await serveiceCreater.getBooks();
        return res.status(200).json({
            data: data.data,
            EC: data.EC,
            EM: data.EM
        })

    } catch (error) {
        console.log(error)
    }
}

let createrAddBook = async (req, res) => {
    try {
        let data = req.body
        let message = await serveiceCreater.createBook(data)
        return res.status(200).json({
            EC: message.EC,
            EM: message.EM
        })
    } catch (error) { console.log(error) }
}

let createrEditBook = async (req, res) => {
    try {
        console.log('data', req.body);
        let message = await serveiceCreater.editBook(req.body);
        return res.status(200).json({
            EC: message.EC,
            EM: message.EM
        })

    } catch (error) {
        console.log(error)
    }
}

const createrDelBook = async (req, res) => {
    try {
        let id = req.body.id
        let message = await serveiceCreater.delBook(id)
        return res.status(200).json({
            EC: message.EC,
            EM: message.EM
        })

    } catch (error) {
        console.log(error)
    }

}

// //////////////////////////////////////////////////////////////////////////////

let createrGetCodeByType = async (req, res) => {
    try {
        let type = req.query.type
        console.log(type)
        let data = await serveiceCreater.getCodeByType(type)
        console.log('data', data)
        return res.status(200).json({ data })


    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: 'Error Server'
        })
    }
}
let handelGetAllCode = async (req, res) => {
    try {
        let data = await serveiceCreater.getAllCode()
        console.log('data', data)
        return res.status(200).json({ data })


    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: 'Error Server'
        })
    }
}

let handelGetCateGoRy = async (req, res) => {
    try {
        let data = await serveiceCreater.getCateGoRy()
        console.log('data', data)
        return res.status(200).json({ data })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: 'Error Server'
        })
    }
}

// DRAFT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let handelcreateDraft = async (req, res) => {
    let data = req.body
    console.log(data);
    let message = await serveiceCreater.createDraft(data)
    return res.status(200).json({
        data: message,
        EC: 0,
        EM: 'success'
    })

}

let handelGetDrafts = async (req, res) => {
    try {
        let data = await serveiceCreater.getDrafts();
        console.log('data', data);
        return res.status(200).json({
            data: data.data,
            EC: data.errorCode,
            EM: data.message
        })


    } catch (error) {
        console.log(error)
    }
}

let handelEditDraft = async (req, res) => {
    try {
        console.log('data', req.body);
        let message = await serveiceCreater.editDraftAutoSave(req.body);
        return res.status(200).json({
            EC: message.errorCode,
            EM: message.message
        })


    } catch (error) {
        console.log(error)
    }
}


let handelGetDraftByID = async (req, res) => {
    try {
        let data = await serveiceCreater.getDraftByID(req.query.id);
        console.log('data', data);
        return res.status(200).json({
            data: data.data,
            EC: data.errorCode,
            EM: data.message
        })


    } catch (error) {
        console.log(error)
    }
}

let handelGetBookByID = async (req, res) => {
    try {
        let data = await serveiceCreater.getBookByID(req.query.id);
        console.log('data', data);
        return res.status(200).json({
            data: data.data,
            EC: data.errorCode,
            EM: data.message
        })


    } catch (error) {
        console.log(error)
    }
}

let handelEditDraftByID = async (req, res) => {
    try {
        console.log('data', req.body);
        let message = await serveiceCreater.publicDraft(req.body);
        return res.status(200).json({
            EC: message.errorCode,
            EM: message.message
        })


    } catch (error) {
        console.log(error)
    }
}

let handelDelDraft = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: 'User already exists',
            errorCode: 1
        })
    }
    let message = await serveiceCreater.delDraft(id)
    return res.status(200).json({
        EC: message.errorCode,
        EM: message.message
    })
}


// CHAPTERS

let createrGetChapterByBookID = async (req, res) => {
    console.log(req.query.bookID);
    try {
        let data = await serveiceCreater.getChapterByBookID(req.query.bookID);
        console.log('data', data);
        return res.status(200).json({
            data: data.data,
            EC: data.errorCode,
            EM: data.message
        })

    } catch (error) {
        console.log(error)
    }
}


let createrEditChapter = async (req, res) => {
    try {
        console.log('data', req.body);
        let message = await serveiceCreater.editChapter(req.body);
        return res.status(200).json({
            EC: message.EC,
            EM: message.EM
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createrGetBooks: createrGetBooks,
    createrAddBook: createrAddBook,
    createrEditBook: createrEditBook,
    createrDelBook: createrDelBook,


    createrGetCodeByType: createrGetCodeByType,
    handelGetCateGoRy: handelGetCateGoRy,
    handelcreateDraft: handelcreateDraft,
    handelEditDraft: handelEditDraft,
    handelGetDrafts: handelGetDrafts,
    handelGetDraftByID: handelGetDraftByID,
    handelEditDraftByID: handelEditDraftByID,
    handelDelDraft: handelDelDraft,
    handelGetBookByID: handelGetBookByID,
    handelGetAllCode: handelGetAllCode,


    createrGetChapterByBookID: createrGetChapterByBookID,
    createrEditChapter: createrEditChapter

}