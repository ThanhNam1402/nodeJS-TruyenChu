

import db from '../models/index';


// BOOKS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

let getAllBook = async (filter) => {

    try {
        let res = {}

        let { count, rows } = await db.Book.findAndCountAll({
            attributes: ['id', 'name', 'createdAt', 'status'],
            where: { status: filter.status },
            limit: Number(filter.limit),
            offset: (Number(filter.page) - 1) * Number(filter.limit),
            order: [['id', 'DESC']],
            raw: true,
        });

        let pagination = {
            total: count,
            limit: Number(filter.limit),
            page: Number(filter.page),
        }

        res.pagination = pagination
        res.data = rows;
        res.EC = 0;
        res.EM = 'success';

        return res

    } catch (error) {
        throw error;
    }

}


let getBookByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = {}
            let books = await db.Book.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['UserId'],
                },

                include: [
                    {
                        model: db.Users,
                        attributes: ['name']
                    },
                ],

                raw: true
            });
            let { count, rows } = await db.Draft.findAndCountAll({
                where: {
                    bookID: id,
                },

                attributes: ['id', 'draftName', 'createdAt'],
                raw: true
            });

            console.log(count);



            if (books) {
                res.chapter = rows
                res.data = books;
                res.EC = 0;
                res.EM = 'success';

            } else {
                res.EC = 1;
                res.EM = 'Error !! Không Tìm Thấy Truyện';
            }

            return resolve(res);

        } catch (error) {
            return reject(error);
        }
    })
}


let publishBook = async (data) => {
    try {


        console.log(data);


        let res = {}
        if (!data.id) {
            res.EC = 1
            res.EM = "Error !! Không tìm thấy Book "
        }
        let book = await db.Book.findOne({
            where: { id: data.id },
            raw: false
        })
        if (book) {
            book.status = 1;
            book.publishAt = data.time
            await book.save();

            res.EC = 0
            res.EM = "Cập Nhật Thành Công !"

        } else {
            res.EC = 3
            res.EM = "Error !! Lỗi Không Xác Định"
        }
        return res

    } catch (error) {
        throw error
    }
}

module.exports = {
    // book 
    getAllBook: getAllBook,
    getBookByID: getBookByID,
    publishBook: publishBook

}