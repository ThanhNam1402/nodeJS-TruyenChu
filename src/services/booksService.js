

import db from '../models/index';
import Sequelize from 'sequelize';


let getAllBooks = async (creatorID) => {
    try {
        let res = {}
        let allBooks = await db.Book.findAll({
            attributes: ['id', 'name', 'createdAt', 'status'],
            where: {
                userID: creatorID
            },
            order: [['id', 'DESC']],
            raw: true,
        });

        res.data = allBooks;
        res.success = true;
        res.message = 'success';

        return res

    } catch (error) { throw error }

}

let getOneBook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let book = await db.Book.findOne({
                where: { id: id }
            });

            if (book) {
                res.data = book
                res.success = true;
                res.message = 'success';
            } else {
                res.success = false;
                res.message = 'Lỗi !! Không tìm thấy tài nguyên';
            }

            return resolve(res);

        } catch (error) {
            return reject(error);
        }
    })
}

let addBook = async (data) => {
    try {
        let res = {}
        await db.Book.create({
            name: data.name,
            content: data.content,
            userID: data.creatorID,
            categoryID: data.categoryID,
            world: data.bookWorld,
            character: data.bookChar,
            poetry: data.bookPoetry,
            school: data.bookSchool,
        })

        res.success = true;
        res.message = 'Tạo Thành Công';

        return res

    } catch (error) { throw error }
}

let editBook = async (data) => {
    let res = {}
    try {
        let book = await db.Book.findOne({
            where: { id: data.id },
            raw: false
        })

        if (data) {
            book.name = data.name
            book.content = data.content
            book.categoryID = data.categoryID
            book.poetry = data.bookPoetry
            book.character = data.bookChar
            book.school = data.bookSchool
            book.world = data.bookWorld
            book.state = data.bookState

            await book.save();

            res.success = true;
            res.message = 'Cập nhật Truyện Thành Công';
        } else {
            res.success = false;
            res.message = 'Không Tìm Thấy !!! ';
        }
        return res

    } catch (error) { throw error }
}

let delBook = async (id) => {
    let res = {}
    try {
        let book = await db.Book.findOne({
            where: { id: id },
            raw: false
        })

        if (!book) {
            res.success = false;
            res.message = 'Lỗi !! Không tìm thấy'
        } else {
            await book.destroy();
            res.success = true;
            res.message = 'Xóa Thành Công !!'
        }

        return res

    } catch (error) { throw error }
}


// Categories
let getTagType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}
            let allTag = await db.Allcode.findAll({
                attributes: ['id', 'name', 'type'],
                raw: true
            });

            res.data = allTag;
            res.success = true;
            res.message = 'success';

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

            let cate = await db.BookCategories.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                raw: true
            });
            res.data = cate;
            res.success = true;
            res.message = 'success';

            resolve(res);

        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    getAllBooks,
    addBook,
    editBook,
    delBook,
    getOneBook,
    getCateGoRy,
    getTagType

}