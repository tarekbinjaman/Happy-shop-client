
import { motion } from 'framer-motion';
import img1 from '../../../src/assets/logos/1.jpg'
import img2 from '../../../src/assets/logos/2.jpg'
import img3 from '../../../src/assets/logos/3.jpg'
import img4 from '../../../src/assets/logos/4.jpg'
import img5 from '../../../src/assets/logos/5.jpg'

const HeroBottom = () => {
    const images = [img1, img2, img3, img4, img5];
    return (
        <div className=' xl:hidden'>
        <div className='flex gap-20 items-center overflow-hidden md:h-20 h-14 w-full bg-black md:mb-24 mb-0 md:py-12'>
            <motion.div
                className="flex gap-20 shrink-0 items-center"
                animate={{ x: ['0%', '-100%'] }}
                transition={{
                    repeatType: 'loop',
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 30 
                }}
            >
                {[...images, ...images].map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`logo-${i}`}
                        className="md:h-16 h-12"
                    />
                ))}

            </motion.div>
            <motion.div
                className="flex gap-20 shrink-0 items-center"
                animate={{ x: ['0%', '-100%'] }}
                transition={{
                    repeatType: 'loop',
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 30 
                }}
            >
                {[...images, ...images].map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`logo-${i}`}
                        className="md:h-16 h-12"
                    />
                ))}

            </motion.div>
        </div>
        <div className='flex gap-20 items-center overflow-hidden md:h-20 h-14 w-full bg-black mb-24 md:py-12 md:hidden'>
            <motion.div
                className="flex gap-20 shrink-0 items-center"
                animate={{ x: ['-100%', '0%'] }}
                transition={{
                    repeatType: 'loop',
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 30 
                }}
            >
                {[...images, ...images].map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`logo-${i}`}
                        className="md:h-16 h-12"
                    />
                ))}

            </motion.div>
            <motion.div
                className="flex gap-20 shrink-0 items-center"
                animate={{ x: ['-100%', '0%'] }}
                transition={{
                    repeatType: 'loop',
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 30 
                }}
            >
                {[...images, ...images].map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`logo-${i}`}
                        className="md:h-16 h-12"
                    />
                ))}

            </motion.div>
        </div>
        </div>


    );
};

export default HeroBottom;