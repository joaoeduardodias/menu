"use server"

import type { Product } from "./types"

export async function getProducts(): Promise<Product[]> {
  // Simulando dados - em produção, buscar de um banco de dados
  return [
    {
      id: "1",
      name: "Classic Burger",
      description: "Hambúrguer 180g, queijo cheddar, alface, tomate, cebola roxa e molho especial",
      price: 28.9,
      image: "/hamburguer-classico-suculento-com-queijo-derretend.jpg",
      category: "classic",
      popular: true,
    },
    {
      id: "2",
      name: "Bacon Supreme",
      description: "2 hambúrgueres 150g, bacon crocante, queijo cheddar duplo, cebola caramelizada",
      price: 38.9,
      image: "/hamburguer-duplo-com-muito-bacon-e-queijo.jpg",
      category: "premium",
      popular: true,
    },
    {
      id: "3",
      name: "Chicken Crispy",
      description: "Frango empanado crocante, queijo prato, alface, tomate e maionese de alho",
      price: 32.9,
      image: "/hamburguer-de-frango-empanado-crocante.jpg",
      category: "classic",
    },
    {
      id: "4",
      name: "Smash Burger",
      description: "2 carnes smash 120g, queijo americano, picles, cebola e molho smash",
      price: 35.9,
      image: "/smash-burger-achatado-com-queijo-derretido.jpg",
      category: "premium",
      popular: true,
    },
    {
      id: "5",
      name: "Veggie Delight",
      description: "Hambúrguer vegetal 180g, queijo vegano, rúcula, tomate seco e pesto",
      price: 34.9,
      image: "/hamburguer-vegetariano-colorido-e-saudavel.jpg",
      category: "special",
    },
    {
      id: "6",
      name: "BBQ Monster",
      description: "2 hambúrgueres 180g, bacon, cheddar, onion rings, molho barbecue e molho ranch",
      price: 42.9,
      image: "/hamburguer-gigante-com-onion-rings-e-molho-barbecu.jpg",
      category: "premium",
    },
    {
      id: "7",
      name: "Cheese Lover",
      description: "Hambúrguer 180g, mix de 4 queijos (cheddar, prato, gorgonzola e cream cheese)",
      price: 39.9,
      image: "/hamburguer-com-muito-queijo-derretendo.jpg",
      category: "special",
    },
    {
      id: "8",
      name: "Hot Jalapeño",
      description: "Hambúrguer 180g, queijo pepper jack, jalapeños, pimenta e molho picante",
      price: 36.9,
      image: "/hamburguer-picante-com-pimentas-jalapeno.jpg",
      category: "special",
    },
  ]
}
