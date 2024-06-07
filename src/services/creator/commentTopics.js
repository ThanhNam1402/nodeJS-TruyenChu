

import db from '../../models/index';
import Sequelize from 'sequelize';


let getAllCommentTopics = async (topicID) => {
    try {
        let res = {}
        let allComment = await db.CMTopic.findAll({

            attributes: [
                "id", "content", "userID", "createdAt", "parentID",
                [Sequelize.literal('`User`.`name`'), 'user_name'],
            ],

            include: [
                {
                    model: db.Users,
                    attributes: []
                },
            ],

            where: {
                topicID: topicID,
            },


            order: [['id', 'DESC']],
            raw: true,
        });
        res.data = allComment;
        res.success = true;
        res.message = 'success';

        return res

    } catch (error) { throw error }

}

let addComment = async (data) => {
    try {
        let res = {}
        await db.CMTopic.create({
            content: data.content,
            userID: data.creatorID,
            topicID: data.topicID,
            parentID: data.commentID ? data.commentID : null
        })

        res.success = true;
        res.message = 'Tạo Thành Công';

        return res

    } catch (error) { throw error }
}

let delComment = async (id) => {
    let res = {}
    try {
        let book = await db.CMTopic.findOne({
            where: { id: id },
            raw: false
        })

        if (!book) {
            res.success = false;
            res.message = 'Lỗi !! Không tìm thấy'
        } else {
            await book.destroy();

            res.data = book
            res.success = true;
            res.message = 'Xóa Thành Công !!'
        }

        return res

    } catch (error) { throw error }
}


module.exports = {
    getAllCommentTopics,
    addComment,
    delComment,
}