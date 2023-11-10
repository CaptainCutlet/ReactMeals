import classes from "./AvailableMeals.module.css";

import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const retrieveMeals = async () => {
      const response = await fetch(
        "https://taskapp-9191a-default-rtdb.europe-west1.firebasedatabase.app/meals/-NZPYFJ04Je_dPvFEM7f.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    retrieveMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes["loading-meals-text"]}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes["error-meals-text"]}>
        <p>{error.message}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.name}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
