
import db from '../models/index';
// $2a$10$SAgLhuAvrRl68uGsnBgQROh7KRICSBd2DW7G606RFRzvW.GFb429O
// eve.holt@reqres.in


let getAllTopics = async (reqData) => {
    console.log(reqData);
    try {

        let res = {}
        let { count, rows } = await db.Topic.findAndCountAll({
            attributes: {
                exclude: ['content', 'userID']
            },
            limit: Number(reqData.limit),
            offset: (Number(reqData.page) - 1) * Number(reqData.limit),
            order: [['id', 'DESC']],
            raw: true,
        });

        let pagination = {
            total: count,
            limit: Number(reqData.limit),
            page: Number(reqData.page),
        }

        res.pagination = pagination
        res.data = rows;
        res.EC = 0;
        res.EM = 'success';

        return res

    } catch (error) {
        console.log(error);
    }


}

let createTopic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await db.Topic.create({
                name: data.name,
                slug: data.slug,
                content: data.content,
            })

            if (res) {
                resolve({
                    EC: 0,
                    EM: 'Tạo Thông Báo Thành Công'
                });
            }

        } catch (error) {
            reject(error);
        }

    })

}

let getTopicByID = async (id) => {
    try {

        let res = {}

        let topic = await db.Topic.findOne({
            where: { id: id },
            raw: true
        });

        console.log(topic);

        if (topic) {
            res.data = topic;
            res.EC = 0;
            res.EM = 'success';

        } else {
            res.EC = 1;
            res.EM = 'Error : Not Found Topic';
        }
        return res

    } catch (error) {
        throw error
    }

}

let getTopicBySlug = async (slug) => {
    try {

        let res = {}

        let topic = await db.Topic.findOne({
            where: { slug: slug },
            raw: true
        });

        console.log(topic);

        if (topic) {
            res.data = topic;
            res.EC = 0;
            res.EM = 'success';

        } else {
            res.EC = 1;
            res.EM = 'Error : Not Found Topic';
        }
        return res

    } catch (error) {
        throw error
    }

}

let editTopic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    EC: 1,
                    EM: "Error !! Không tìm thấy Topic "
                })
            }
            let topic = await db.Topic.findOne({
                where: { id: data.id },
                raw: false
            })
            if (topic) {
                topic.name = data.name;
                topic.content = data.content;
                topic.slug = data.slug;

                await topic.save();
                resolve({
                    EC: 0,
                    EM: "Cập Nhật Thành Công !"
                });

            } else {
                resolve({
                    EC: 3,
                    EM: "Error !! Lỗi Không Xác Định"
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let delTopic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Topic.findOne({
                where: { id: id },
                raw: false
            })

            if (!user) {
                resolve({
                    EC: 1,
                    EM: "Erro !! Không tìm thấy user"
                })
            } else {
                await user.destroy();
                resolve({
                    EC: 0,
                    EM: "Thao Tác Thành Công !"
                })
            }
        } catch (error) {
            reject(error);
        }


    })

}


module.exports = {
    getAllTopics: getAllTopics,
    createTopic: createTopic,
    delTopic: delTopic,
    getTopicByID: getTopicByID,
    editTopic: editTopic,
    getTopicBySlug: getTopicBySlug
}