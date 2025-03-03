import DishForm from '../../components/dish-form/dish-form.tsx';
import {useState} from 'react';
import {IDishShort} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {useNavigate} from 'react-router';
const AddDish = () => {
const navigate = useNavigate()
const [loading, setLoading] = useState(false)


const onAddDishClick = async (dishData: IDishShort) => {
setLoading(true);
    try {
        await axiosApi.post('/dishes.json', dishData);
        } finally {
        setLoading(false);
        navigate('/');
    }
};
return (
    <div>
      <DishForm onSubmit={onAddDishClick} loading={loading}/>
    </div>
);
};
export default AddDish;
