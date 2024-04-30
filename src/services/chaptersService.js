

import db from '../models/index';
import Sequelize from 'sequelize';

let getAllDrafts = (creatorID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let allDrafts = await db.Draft.findAll({
                where: {
                    status: 0,
                    userID: creatorID
                },

                attributes: [
                    "id", "content", "createdAt", "draftName",
                    [Sequelize.literal('`Book`.`name`'), 'bookName'],
                ],

                include: [
                    {
                        model: db.Book,
                        attributes: []
                    },
                ],

                order: [['id', 'DESC']],
                raw: true
            });

            res.data = allDrafts;
            res.success = true;
            res.message = 'success';

            return resolve(res);

        } catch (error) {
            return reject(error);
        }
    })
}

let createDraft = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Draft.create({
                content: data.content,
                draftName: data.draftName,
                userID: data.userID,
            })

            let newDraftID = await db.Draft.findAll({
                attributes: ['id'],
                order: [['id', 'DESC']],
                limit: 1,
            })

            console.log('newDraftID ', newDraftID[0].id)

            let newDraft = await db.Draft.findOne({
                where: { id: newDraftID[0].id },
                raw: true
            })
            resolve(newDraft);


        } catch (error) {
            reject(error);
        }

    })

}

let updateDraft = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let draft = await db.Draft.findOne({
                where: { id: data.id },
                raw: false
            })
            if (data) {
                draft.content = data.content,
                    draft.draftName = data.draftName,
                    draft.bookID = data.bookID

                await draft.save();
            } else {
                resolve({});
            }

            resolve({
                success: true,
                message: 'Cập Nhật Thành Công'
            });

        } catch (error) {
            reject(error);
        }

    })

}

let delDraft = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let draft = await db.Draft.findOne({
                where: { id: id },
                raw: false
            })

            if (!draft) {
                resolve({
                    success: false,
                    message: "Lỗi !! Không tìm thấy tài nguyên !"
                })
            } else {
                await draft.destroy();
                resolve({
                    success: true,
                    message: "Đã Xóa Thành Công !!!"
                })
            }
        } catch (error) {
            reject(error);
        }


    })

}

let publicDraft = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let draft = await db.Draft.findOne({
                where: { id: data.id, userID: data.userID },
                raw: false
            })

            console.log(draft)
            if (draft) {
                draft.content = data.content,
                    draft.draftName = data.draftName,
                    draft.bookID = data.bookID,
                    draft.status = 1
                await draft.save();
            } else {
                resolve({
                    success: false,
                    message: 'Không Thể Xuất Bản'
                });
            }

            resolve({
                success: true,
                message: 'Đã Xuất Bản Thành Công !!'
            });

        } catch (error) {
            reject(error);
        }

    })

}

let getOneDraft = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = {}

            let draft = await db.Draft.findOne({
                where: { id: id },
                raw: true
            });

            if (draft) {
                res.data = draft;
                res.success = true;
                res.message = 'success';

            } else {
                res.success = false;
                res.message = 'Không tìm thấy tài nguyên';
            }

            return resolve(res);


        } catch (error) {
            return reject(error);
        }
    })
}

// CHAPTER

let getAllChapters = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = {}

            let draft = await db.Draft.findAll({
                attributes: ['id', 'content', 'createdAt', 'draftName'],
                where: {
                    bookID: id,
                    status: 1
                },
                raw: true
            });

            if (draft) {
                res.data = draft;
                res.success = true;
                res.message = 'success';

            } else {
                res.success = false;
                res.message = 'Không tìm thấy tài nguyên';
            }

            return resolve(res);

        } catch (error) {
            return reject(error);
        }
    })
}

let updateChapter = async (data) => {
    let res = {}
    try {
        let draft = await db.Draft.findOne({
            where: { id: data.id },
            raw: false
        })

        if (data) {
            draft.draftName = data.draftName,
                draft.content = data.content,

                await draft.save();

            res.success = true;
            res.message = 'Cập nhật Chương Thành Công';
        } else {
            res.success = false;
            res.message = 'Không Tìm Thấy !!! ';
        }
        return res

    } catch (error) {
        throw error;

    }
}




module.exports = {

    // draft 
    getAllDrafts,
    createDraft,
    updateDraft,
    getOneDraft,
    publicDraft,
    delDraft,

    // chapter 
    getAllChapters,
    updateChapter
}