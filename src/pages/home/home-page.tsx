import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { IDish, IDishesList } from "../../types";
import DishCard from "../../components/dishCard/dishCard";
import { CircularProgress, Grid, Button } from "@mui/material";
interface Props {
    addDishToBasket: (dish: IDish) => void
    }

    
    const Home = ({addDishToBasket}: Props) => {
    const [dishes, setDishes] = useState<IDish[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                setLoading(true);
                console.log("➡ Отправляю запрос к Firebase...");

                const response = await axiosApi.get<IDishesList | null>("/dishes.json");

                console.log("✅ Ответ от Firebase:", response.data);

                const dishesData = response.data ?? {};

                if (Object.keys(dishesData).length === 0) {
                    console.warn("⚠ В базе данных пусто!");
                    setDishes([]);
                    return;
                }

                const newDishes: IDish[] = Object.keys(dishesData).map((key) => ({
                    id: key,
                    ...dishesData[key],
                }));

                console.log("📌 Преобразованные данные:", newDishes);
                setDishes(newDishes);
            } catch (error) {
                console.error("❌ Ошибка при загрузке блюд:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    return (
        <div>
        {loading ? <CircularProgress /> : (
        <>
        {dishes.map(dish => (
        <DishCard key={dish.id} dish={dish}
        addDishToBasket={addDishToBasket} />
        ))}
        </>
        )}
        </div>
        );
        
};

export default Home;