

import db from '../models/index';


// BOOKS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

let getBooks = async () => {
    let res = {}

    try {

        let allBook = await db.Book.findAll({
            attributes: ['id', 'name', 'createdAt', 'status'],
            order: [['id', 'DESC']],
            raw: true,
        });

        res.data = allBook;
        res.EC = 0;
        res.EM = 'success';

        return res

    } catch (error) {
        res.data = [];
        res.EC = 1;
        res.EM = error.message;
        return res
    }

}

let createBook = async (data) => {
    let res = {}

    try {
        await db.Book.create({
            name: data.name,
            content: data.content,
            categoryID: data.categoryID,
            world: data.bookWorld,
            character: data.bookChar,
            poetry: data.bookPoetry,
            school: data.bookSchool,
        })

        res.EC = 0;
        res.EM = 'Tạo Thành Công';

        return res

    } catch (error) {
        res.EC = 1;
        res.EM = error.message;
        return res
    }
}

let editBook = async (data) => {
    let res = {}
    try {
        let book = await db.Book.findOne({
            where: { id: data.id },
            raw: false
        })

        if (data) {
            book.name = data.name,
                book.content = data.content,
                book.categoryID = data.categoryID,
                book.poetry = data.bookPoetry,
                book.character = data.bookChar,
                book.school = data.bookSchool,
                book.world = data.bookWorld,

                await book.save();

            res.EC = 0;
            res.EM = 'Cập nhật Truyện Thành Công';
        } else {
            res.EC = 1;
            res.EM = 'Không Tìm Thấy !!! ';
        }
        return res

    } catch (error) {
        res.EC = 1;
        res.EM = error.message;
        return res
    }
}

let delBook = async (id) => {
    let res = {}
    try {
        let findBook = await db.Book.findOne({
            where: { id: id },
            raw: false
        })

        if (!findBook) {
            res.EC = 1;
            res.EM = 'Lỗi !! Không tìm thấy !'
        } else {
            await findBook.destroy();
            res.EC = 0;
            res.EM = 'Xóa Thành Công !! '

        }
        return res

    } catch (error) {
        throw new Error(error)
    }



}

let getBookByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = {}

            let book = await db.Book.findOne({
                where: { id: id },
                raw: true
            });

            if (book) {
                res.data = book;
                res.errorCode = 0;
                res.message = 'success';

            } else {
                res.errorCode = 1;
                res.message = 'Error : Not Found ';

            }

            return resolve(res);



        } catch (error) {
            return reject(error);
        }
    })
}

// 
let getAllCode = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let Allcode = await db.Allcode.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                attributes: ['id', 'name', 'type'],
                raw: true
            });
            res.data = Allcode;
            res.errorCode = 0;
            res.message = 'success';

            resolve(res);

        } catch (error) {

            reject(error);
        }
    })
}

let getCodeByType = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}

            if (!type) {
                res.errorCode = 1;
                res.message = 'not found parameter';
            } else {
                let Allcode = await db.Allcode.findAll({
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    attributes: ['id', 'valueEn'],
                    where: { type: type },
                    raw: true
                });
                res.data = Allcode;
                res.errorCode = 0;
                res.message = 'success';
            }

            resolve(res);

        } catch (error) {

            reject(error);
        }
    })
}

let getCateGoRy = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}

            let Allcode = await db.BookCategories.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                raw: true
            });
            res.data = Allcode;
            res.errorCode = 0;
            res.message = 'success';

            resolve(res);

        } catch (error) {

            reject(error);
        }
    })
}

// DRAFTS

let getDrafts = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = {}

            let allDraft = await db.Draft.findAll({

                include: [
                    {
                        model: db.Book,
                        attributes: ['id', 'name']
                    },
                ],
                attributes: ['id', 'content', 'createdAt', 'draftName'],
                where: { status: 0 },
                order: [['id', 'DESC']],
                raw: true
            });

            if (allDraft) {
                res.data = allDraft;
                res.errorCode = 0;
                res.message = 'success';

            } else {
                res.errorCode = 1;
                res.message = 'Error';

            }

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
                userID: 1,
            })

            let newDraftID = await db.Draft.findAll({
                attributes: ['id'],
                order: [['id', 'DESC']],
                limit: 1
            })

            console.log('newDraftID ', newDraftID[0].id)

            let newDraft = await db.Draft.findOne({
                where: { id: newDraftID[0].id },
                raw: false
            })
            resolve(newDraft);


        } catch (error) {
            reject(error);
        }

    })

}

let editDraftAutoSave = (data) => {
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
                errorCode: 0,
                message: 'Update Draft Success'
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
                    errorCode: 1,
                    message: "Lỗi !! Không tìm thất !"
                })
            } else {
                await draft.destroy();
                resolve({
                    errorCode: 0,
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
                    errorCode: -1,
                    message: 'Update Draft error.'
                });
            }

            resolve({
                errorCode: 0,
                message: 'Update Draft Success'
            });

        } catch (error) {
            reject(error);
        }

    })

}

let getDraftByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = {}

            let draft = await db.Draft.findOne({
                where: { id: id },
                raw: true
            });

            if (draft) {
                res.data = draft;
                res.errorCode = 0;
                res.message = 'success';

            } else {
                res.errorCode = 1;
                res.message = 'Error';

            }

            return resolve(res);


        } catch (error) {
            return reject(error);
        }
    })
}

// CHAPTER

let getChapterByBookID = (id) => {
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
                res.errorCode = 0;
                res.message = 'success';

            } else {
                res.errorCode = 1;
                res.message = 'Error';

            }

            return resolve(res);

        } catch (error) {
            return reject(error);
        }
    })
}

let editChapter = async (data) => {
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

            res.EC = 0;
            res.EM = 'Cập nhật Chương Thành Công';
        } else {
            res.EC = 1;
            res.EM = 'Không Tìm Thấy !!! ';
        }
        return res

    } catch (error) {
        res.EC = 1;
        res.EM = error.message;
        return res
    }
}




module.exports = {
    // book 
    getBooks: getBooks,
    createBook: createBook,
    editBook: editBook,
    delBook: delBook,


    // draft 
    getCodeByType: getCodeByType,
    getCateGoRy: getCateGoRy,
    createDraft: createDraft,
    editDraftAutoSave: editDraftAutoSave,
    getDrafts: getDrafts,
    getDraftByID: getDraftByID,
    publicDraft: publicDraft,
    delDraft: delDraft,
    getBookByID: getBookByID,
    getAllCode: getAllCode,


    // chapter 
    getChapterByBookID: getChapterByBookID,
    editChapter: editChapter
}