import React from "react";
import "./FeaturedDishes.css";

function FeaturedDishes() {
  return (
    <section className="featured-dishes">
      <h2>Our Popular Dishes</h2>
      <div className="dish-cards">
        <div className="dish-card">
          <img src="/assets/images/dish1.jpg" alt="Dish 1" />
          <h3>Spicy Chicken</h3>
          <p>Delicious and hot</p>
        </div>
        <div className="dish-card">
          <img src="/assets/images/dish2.jpg" alt="Dish 2" />
          <h3>Pasta Alfredo</h3>
          <p>Creamy and tasty</p>
        </div>
        <div className="dish-card">
          <img src="/assets/images/dish3.jpg" alt="Dish 3" />
          <h3>Veggie Pizza</h3>
          <p>Fresh ingredients</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturedDishes;
