import bottom from '../../../src/assets/hero/hero-bottom-lg.png'
import bottom2 from '../../../src/assets/hero/hero-bottom-sm.png'

const HeroBottom = () => {
    return (
        <div className='mb-24'>
            <img src={bottom} className='w-full hidden md:block' alt="brands logos" />
            <img src={bottom2} className='w-full md:hidden' alt="brands logos" />
        </div>
    );
};

export default HeroBottom;