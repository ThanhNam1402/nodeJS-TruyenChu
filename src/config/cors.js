var cors = require('cors')



// nhung domain duoc phep truy cap tai nguyen server 
// client and creater 
const WHITELIST_DOMAINS = ['http://localhost:3000', 'http://localhost:3004', 'http://localhost:5173']



// cau hinh corsOption 
export const corsOptions = {
    origin: function (origin, callback) {
        // Cho phép việc gọi API bằng POSTMAN trên môi trường dev,
        // Thông thường khi sử dụng postman thì cái origin sẽ có giá trị là undefined
        // Update mới: Ở video số 75 trong chuỗi MERN Stack PRO khi chúng ta deploy dự án lên một Server Production thì sẽ sửa lại đoạn này thêm một chút nữa để phù hợp với từng môi trường production hoặc dev nhé. Học với mình thì các bạn cứ yên tâm về sự chỉn chu chuẩn chỉnh nhé :D
        if (!origin) {
            // && env.BUILD_MODE === 'dev'
            return callback(null, true)
        }

        // Kiểm tra dem origin có phải là domain được chấp nhận hay không
        if (WHITELIST_DOMAINS.includes(origin)) {
            return callback(null, true)
        }

        // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
        return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
    },

    // Some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,

    // CORS sẽ cho phép nhận cookies từ request
    credentials: true
}


