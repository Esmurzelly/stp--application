import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <motion.div
                className='w-[50px] h-[50px] bg-black'
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
            />
        </div>

    )
}

export default Loader