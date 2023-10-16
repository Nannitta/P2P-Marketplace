import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

const SliderPhotoProduct = ({ productImages }) => {
    return (
        <>
            <Carousel>
                {
                    productImages?.map((image) => {
                        return (
                            <Carousel.Item key={image?.url}>
                                <img src={`${import.meta.env.VITE_BACK_URL}/uploads/${image.url}`}/>
                            </Carousel.Item>);
                    })
                }
            </Carousel>
        </>
    );
};

SliderPhotoProduct.propTypes = {
    productImages: PropTypes.array
};

export default SliderPhotoProduct;
