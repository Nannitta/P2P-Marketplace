import { useState, useEffect } from 'react';
import { addProductService } from '../service';

function useAddProduct (token, formData) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    useEffect(() => {
        const handleSubmit = async () => {
            setIsSubmitting(true);

            try {
                setIsSubmitting(true);
                const response = await addProductService(token, formData);

                return response;
            } catch (error) {
                setSubmissionError(error.message);
            } finally {
                setIsSubmitting(false);
            }
        };

        handleSubmit();
    });

    return { isSubmitting, submissionError };
}

export default useAddProduct;
