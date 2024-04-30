
import topicsService from '../services/topicsService'

let getAllTopics = async (req, res) => {

    try {
        let data = await topicsService.getAllTopics(req.query);

        return res.status(200).json({
            ...data
        })
    } catch (error) {

    }

}

let handelCreateTopic = async (req, res) => {
    try {
        let data = req.body
        let message = await topicsService.addTopic(data)
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

        let data = await topicsService.getTopicByID(req.params.id);
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
        let message = await topicsService.editTopic(data)
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
        let message = await topicsService.delTopic(id)
        return res.status(200).json({
            EC: message.EC,
            EM: message.EM
        })
    } catch (error) {
        console.log(error);
    }
}

let getTopicBySlug = async (req, res) => {
    try {

        let data = await topicsService.getTopicBySlug(req.params.slug);
        return res.status(200).json({
            ...data
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllTopics,
    getTopicBySlug,

    handelCreateTopic,
    handelDelTopic,
    handelGetTopicByID,
    handelEditTopic,
}