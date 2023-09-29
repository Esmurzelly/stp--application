import User from "../models/User.js";
import Marker from "../models/Marker.js";

// create marker
export const createMarker = async (req, res) => {
    try {
        const { category, description, metres } = req.body;
        const position = JSON.parse(req.body.position);

        if (!category || !description || !position || !metres) {
            console.log('Missing required fields:', { category, description, position, metres }); 
            return res.status(404).json({ message: "fields are not found!" });
        }

        console.log({ category, description, position, metres }); 

        const newMarker = new Marker({
            category,
            description,
            position,
            author: req.userId,
            metres,
            // createdAt
            // imgUrl: ''
        });

        await newMarker.save();

        console.log('newMarker', newMarker);
        console.log('req.userId', req.userId);

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

        if (marker.author.toString() !== req.userId) {
            console.log('can not to delete')
            return res.status(403).json({ message: 'You are not authorized to delete this marker' })
        }

        // Попробуйте удалить маркер
        await Marker.findByIdAndDelete(markerId);

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