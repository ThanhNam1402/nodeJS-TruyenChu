

import cmTopicService from '../../services/creator/commentTopics';

const getAllCommentTopics = async (req, res) => {
    try {
        let { topicID } = req.query;
        let data = await cmTopicService.getAllCommentTopics(topicID);
        return res.status(200).json({
            ...data
        })

    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}


let addCommentTopic = async (req, res) => {
    try {
        let data = req.body
        let message = await cmTopicService.addComment(data)
        return res.status(200).json({
            ...message
        })
    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}
let getAllReplys = async (req, res) => {
    try {
        let commentID = req.query.commentID
        let message = await cmTopicService.getAllReplys(commentID)
        return res.status(200).json({
            ...message
        })
    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }
}


// const getOneBook = async (req, res) => {
//     try {

//         let { id } = req.params;
//         let data = await booksService.getOneBook(id);
//         console.log('data', data);
//         return res.status(200).json({
//             ...data
//         })


//     } catch (error) {
//         return res.status(403).json({
//             errors: error.message
//         })
//     }
// }



// const updateBook = async (req, res) => {
//     try {
//         console.log('data', req.body);
//         let message = await booksService.editBook(req.body);
//         return res.status(200).json({
//             ...message,
//         })

//     } catch (error) {
//         return res.status(403).json({
//             errors: error.message
//         })
//     }
// }

const delCommentTopic = async (req, res) => {
    try {
        let { id } = req.params
        let message = await cmTopicService.delComment(id)
        return res.status(200).json({
            ...message
        })

    } catch (error) {
        return res.status(403).json({
            errors: error.message
        })
    }

}


module.exports = {
    getAllCommentTopics,
    // getOneBook,
    getAllReplys,
    addCommentTopic,
    delCommentTopic,
    // updateBook,

}