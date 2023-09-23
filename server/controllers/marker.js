import User from "../models/User.js";
import Marker from "../models/Marker.js";

// create marker
export const createMarker = async (req, res) => {
    try {
        const { markerName, category, description, position } = req.body;
        // const user = await User.findById(req.userId);

        // if (!user) {
        //     return res.status(404).json({ message: `Пользователь не найден, user is ${user}` });
        // }

        const newMarker = new Marker({
            markerName,
            category,
            description,
            position
            // username: user.fullName,
            // author: req.userId,
        });

        await newMarker.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { markers: newMarker },
        });

        res.json(newMarker);
    } catch (e) {
        res.status(500).json({ message: `Ошибка сервера - ${e.message}` });
    }
};


export const getAllMarkers = async (req, res) => {
    try {
        const markers = await Marker.find().sort('-createdAt');
        const currentMarkers = await Marker.find().limit(200).sort('-createdAt');

        if(!markers) {
            return res.json({ message: "No markers" })
        }

        res.json({ markers, currentMarkers });
    } catch (e) {
        res.json({
            message: 'Что-то пошло не так.',
          });
    }
};

// export const getMyMarker = async (req, res) => {
//     try {
//         const markerId = req.params.id;
//         const marker = await Marker.findById(markerId);

//         if (!marker) {
//             return res.status(404).json({ message: 'Маркер не найден' });
//         }

//         res.json(marker);

//         // const user = await User.findById(req.userId);
//         // const listOfMarkers = await Promise.all(
//         //     user.markers.map(marker => {
//         //         return Marker.findById(marker._id);
//         //     })
//         // );
        
//         res.json(listOfMarkers);
//     } catch (e) {
//         res.json({
//             message: 'Что-то пошло не так.',
//           });
//     }
// };

export const removeMarker = async (req, res) => {
    try {
        const markerId = req.params.id;
        const marker = await Marker.findById(markerId);

        if (!marker) {
            return res.status(404).json({ message: 'Такого маркера не существует' });
        }

        // Попробуйте удалить маркер
        await Marker.findByIdAndDelete(markerId);

        // Удалите маркер из списка маркеров пользователя
        await User.findByIdAndUpdate(req.userId, {
            $pull: { markers: markerId },
        });

        res.json({ message: 'Marker был удален.' });
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так.' });
    }
};


// export const updateMarker = async (req, res) => {
//     try {
//         const { markerName, category, description, id } = req.body;
//         const marker = await Marker.findById(id);

//         marker.markerName = markerName;
//         marker.category = category;
//         marker.description = description;

//         await marker.save();

//         res.json(marker);
//     } catch (error) {
//         res.json({ message: 'Что-то пошло не так.' })
//     }
// }