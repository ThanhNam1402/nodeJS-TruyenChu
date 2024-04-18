

import serviceTopics from '../services/serviceTopics'

let handelGetAllTopic = async (req, res) => {

    let data = await serviceTopics.getAllTopics(req.query);
    console.log(data)

    return res.status(200).json({
        data: data.data,
        _pagination: data.pagination,
        EC: data.EC,
        EM: data.EM
    })
}

let handelCreateTopic = async (req, res) => {

    try {
        let data = req.body
        let message = await serviceTopics.createTopic(data)
        return res.status(200).json({
            EC: message.EC,
            EM: message.EM
        })
    } catch (error) {
        console.log(error);
    }
}

let handelGetTopicByID = async (req, res) => {
    try {

        let data = await serviceTopics.getTopicByID(req.params.id);
        return res.status(200).json({
            data: data.data,
            EC: data.EC,
            EM: data.EM
        })

    } catch (error) {
        console.log(error)
    }
}

let handelEditTopic = async (req, res) => {

    try {
        let data = req.body
        let message = await serviceTopics.editTopic(data)
        return res.status(200).json({
            EC: message.EC,
            EM: message.EM,
        })
    } catch (error) {
        console.log(error);
    }


}

let handelDelTopic = async (req, res) => {

    try {
        let id = req.query.id
        if (!id) {
            return res.status(200).json({
                EM: 'User already exists',
                EC: 1
            })
        }
        let message = await serviceTopics.delTopic(id)
        return res.status(200).json({
            EC: message.EC,
            EM: message.EM
        })
    } catch (error) {
        console.log(error);
    }
}

let handelGetTopicBySlug = async (req, res) => {
    try {

        let data = await serviceTopics.getTopicBySlug(req.params.slug);
        return res.status(200).json({
            data: data.data,
            EC: data.EC,
            EM: data.EM
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    handelGetAllTopic: handelGetAllTopic,
    handelCreateTopic: handelCreateTopic,
    handelDelTopic: handelDelTopic,
    handelGetTopicByID: handelGetTopicByID,
    handelEditTopic: handelEditTopic,
    handelGetTopicBySlug: handelGetTopicBySlug
}