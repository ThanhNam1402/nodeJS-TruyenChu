
import chaptersService from '../../services/creator/chaptersService';

let getAllDrafts = async (req, res) => {
    try {

        let id = req.query.creatorID

        let data = await chaptersService.getAllDrafts(id);
        return res.status(200).json({
            ...data
        })

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}

let addDraft = async (req, res) => {
    try {
        let reqBody = req.body
        console.log(data);
        let data = await chaptersService.createDraft(reqBody)
        return res.status(200).json({
            data: data,
            success: true,
            message: 'success'
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }


}

let updateDraft = async (req, res) => {
    try {
        let message = await chaptersService.updateDraft(req.body);
        return res.status(200).json({
            ...message,
        })

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}

let getOneDraft = async (req, res) => {
    try {
        let { id } = req.params
        let data = await chaptersService.getOneDraft(id);
        console.log('data', data);
        return res.status(200).json({
            ...data
        })

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}

let publicDraft = async (req, res) => {
    try {
        console.log('data', req.body);

        let message = await chaptersService.publicDraft(req.body);
        return res.status(200).json({
            ...message
        })

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}

let delDraft = async (req, res) => {
    try {
        let { id } = req.params

        let message = await chaptersService.delDraft(id)
        return res.status(200).json({
            ...message
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }

}

// CHAPTERS

let getAllChapters = async (req, res) => {
    console.log(req.query.bookID);
    try {

        let { bookID } = req.query
        let data = await chaptersService.getAllChapters(bookID);
        console.log('data', data);
        return res.status(200).json({
            ...data
        })

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}

let updateChapter = async (req, res) => {
    try {
        console.log('data', req.body);
        let message = await chaptersService.updateChapter(req.body);
        return res.status(200).json({
            ...message
        })

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    addDraft,
    updateDraft,
    getAllDrafts,
    publicDraft,
    getOneDraft,
    delDraft,
    getAllChapters,
    updateChapter
}