
import booksService from '../services/booksService';


// ========== Book =================== > 

const getAllBooks = async (req, res) => {
    try {
        let { creatorID } = req.query;
        let data = await booksService.getAllBooks(creatorID);
        return res.status(200).json({
            ...data
        })

    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}

const getOneBook = async (req, res) => {
    try {

        let { id } = req.params;
        let data = await booksService.getOneBook(id);
        console.log('data', data);
        return res.status(200).json({
            ...data
        })


    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}

let addBook = async (req, res) => {
    try {
        let data = req.body
        let message = await booksService.addBook(data)
        return res.status(200).json({
            ...message
        })
    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}

const updateBook = async (req, res) => {
    try {
        console.log('data', req.body);
        let message = await booksService.editBook(req.body);
        return res.status(200).json({
            ...message,
        })

    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}

const delBook = async (req, res) => {
    try {
        let { id } = req.params
        let message = await booksService.delBook(id)
        return res.status(200).json({
            ...message
        })

    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }

}


// ========== Categories =================== > 

const getTagType = async (req, res) => {
    try {
        let data = await booksService.getTagType()
        return res.status(200).json({
            ...data
        })

    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}

const getCateGoRy = async (req, res) => {
    try {
        let data = await booksService.getCateGoRy()
        return res.status(200).json({ ...data })
    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}


module.exports = {
    getAllBooks,
    getOneBook,
    addBook,
    delBook,
    updateBook,
    getCateGoRy,
    getTagType,
}