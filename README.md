# Restaurant Booking APIs

Welcome to the Restaurant Booking project! This application allows users to search for restaurants by name or dishes, view restaurant details and menus, add dishes to their cart, and calculate tax and bill for checkout. Below are the details and instructions for running the project.

## Requirements
- Node.js version 21 or higher
- PostgreSQL
- Sequelize
- Docker (optional for running via Docker)

## Setup
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Create a `.env` file based on the `.env.example` file provided.
4. Run `npm install` to install the project dependencies.

## Running the Project
To start the project, use one of the following commands:

- Development mode:
    ```bash
    npm run dev
    ```

- Production mode:
    ```bash
    npm run start
    ```

## Endpoints
- **Search Restaurant:**  
    - **GET** `/api/restaurants?search={searchQuery}`  
    - **Description:** Search for restaurants by name or dishes.  
    - **Query Parameters:**  
        - `search`: Search query.  
    - **Response:**  
        - `200 OK`  
            ```json
            {
                "restaurants": [
                    {
                        "id": 1,
                        "name": "Restaurant Name",
                        "address": "Restaurant Address",
                        "phone": "Restaurant Phone",
                        "dishes": [
                            {
                                "id": 1,
                                "name": "Dish Name",
                                "price": 10.00
                            }
                        ]
                    }
                ]
            }
            ```
- **Search Restaurant:**
  - **Get Restaurant Details and Menu:**
  - **GET** `/api/restaurants/{restaurantId}`
  - **Description:** Get restaurant details and menu by restaurant ID.
  - **Path Parameters:**
    - `restaurantId`: Restaurant ID.
  - **Response:**
    - `200 OK`
      ```json
      {
 
          "restaurant_id": 1,
          "name": "Restaurant Name",
          "address": "Restaurant Address",
          "phone": "Restaurant Phone",
          "dishes": [
              {
                  "id": 1,
                  "name": "Dish Name",
                  "price": 10.00
              }
          ]
        
      }
      ```

- **Add Dishes to Cart:**  
    - **POST** `/api/cart`  
    - **Description:** Add dishes to the cart.  
      - **Request Body:**  
          ```json
         {
            "user_email":"usremail@gmail.com",
            "user_name":"usr name",
            "dish_id":2,
            "quantity":3,
            "restaurant_id":1
        }
          ```
    - **Response:**  
        - `200 OK`  
            ```json
            {
                      
                  "customer_id": "4",
                  "cart_id": "6"
                        
            }
            ```
- **Calculate Tax and Bill, Fetch Cart:**  
    - **GET** `/api/cart/{cartId}`  
    - **Description:** Calculate tax and bill for the cart.  
    - **Path Parameters:**  
        - `cartId`: Cart ID.  
    - **Response:**  
        - `200 OK`  
            ```json
            {
                "cart_id": 1,
                "subtotal": 30.00,
                "tax": 1.50,
                "total_bill": 31.50,
                "dishes": [
                        {
                            "id": 1,
                            "name": "Dish Name",
                            "price": 10.00,
                            "quantity": 3
                        }
                ],
                "restaurant": {
                    "id": 1,
                    "name": "Restaurant Name",
                    "address": "Restaurant Address",
                    "phone": "Restaurant Phone"
                },
                "customer": {
                    "id": 1,
                    "name": "Customer Name",
                    "email": "Customer Email"
                }
            }
            ```
## Running with Docker
If you prefer to run the application using Docker, follow these steps:
1. Make sure you have Docker installed on your system.
2. Navigate to the project directory.
3. Run the following command:
`docker compose up`

## Postman collection attached

## Contributors
- Purnima Srivastava

