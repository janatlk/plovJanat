import styles from './styles.module.css'
import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import {IDishShort} from '../../types.ts';
import { Password } from '@mui/icons-material';
const INITIAL_FORM_STATE: IDishShort = {
name: '',
description: '',
price: 0
}
interface Props {
    onSubmit: (dishData: IDishShort) => void
    dish?: IDishShort
    loading?: boolean
    }
    const DishForm = ({onSubmit, loading, dish}:Props) => {
        const [formState, setFormState] = useState<IDishShort>(dish || INITIAL_FORM_STATE)


const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormState(prevState => ({...prevState, [name]: value}));
    };

const onFormSubmit = (event:FormEvent) => {
    event.preventDefault()
    if (formState.name != '' && formState.description != '' && formState.price != 0) {
        onSubmit(formState)
    } else {
        var errortext = document.getElementById('error');
        var txt = 'The fields are empty or equal to zero'
        if ('textContent' in errortext){
            errortext.textContent = txt;
        } else {
            errortext.innerText = txt;
        }
    }
        }
    
return (
    <div className={styles.center}>
         <form className={styles.form} onSubmit={onFormSubmit}>
            <div id='error'></div>
            <TextField
                label={'Dish name'}
                value={formState.name}
                name={'name'}
                onChange={inputChangeHandler}
                />
            <TextField
            label={'Description'}
            value={formState.description}
            name={'description'}
            onChange={inputChangeHandler}
            />
            <TextField
            label={'Price'}
            value={formState.price}
            name={'price'}
            type={'number'}
            onChange={inputChangeHandler}
            />
            <Button
                type={'submit'}
                variant={'contained'}
                loading={loading}
                >
                {dish ? 'Edit Dish' : 'Add Dish'}
                </Button>
        </form>
    </div>
);
};
export default DishForm;
