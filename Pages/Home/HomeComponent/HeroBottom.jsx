
import { motion } from 'framer-motion';
import img1 from '../../../src/assets/logos/1.jpg'
import img2 from '../../../src/assets/logos/2.jpg'
import img3 from '../../../src/assets/logos/3.jpg'
import img4 from '../../../src/assets/logos/4.jpg'
import img5 from '../../../src/assets/logos/5.jpg'

const HeroBottom = () => {
    const images = [img1, img2, img3, img4, img5]
    return (

        <div className="relative overflow-hidden w-full h-20 bg-black mb-24">
            <motion.div
                className="flex gap-20 w-max absolute"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 20,
                }}
            >
                {/* Repeat images twice in a row to allow continuous scrolling */}
                {[...images, ...images].map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`logo-${i}`}
                        className="h-16 w-auto object-contain"
                    />
                ))}
            </motion.div>
        </div>

    );
};

export default HeroBottom;