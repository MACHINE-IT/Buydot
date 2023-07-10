import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
//import Checkout from "./Checkout"
// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */

export const generateCartItemsFrom = (cartData, productsData) => {
  // const items = cartData.map((item) => {
  //   const product = productsData.find((productData) => item.productId === productData._id);
  //   return {
  //     ...product,
  //     productId: item.productId,
  //     productCost: product.cost,
  //     qty: item.qty,
  //   };
  // });
  // console.log("items returning from generateCartItemsFrom", items);
  // return items;
  console.log("line66cart", cartData, productsData)
  let productMap = {};
  productsData.forEach(p => {
    productMap[p._id] = p
  })
  console.log("productMap>", productMap);
  return cartData.map(item => ({
    ...productMap[item.productId],
    ...item
  }))
};


/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items) => {
  return items.reduce((total, item) => {
    return total + item.cost * item.qty;
  }, 0)
};


/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * 
 */
const Cart = ({
  products,
  items = [],
  handleQuantity,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  // const [productsData, setProductsData] = useState([]);
  // const [cartData, setCartData] = useState([]);
  // // const [localCartData, setLocalCartData] = useState([])
  // const [cartProductDetails, setCartProductDetails] = useState([]);

  // useEffect(() => {
  //   const fetchProductsData = async () => {
  //     console.log("inside fetchProductsData")
  //     try {
  //       const response = await axios.get(`${config.endpoint}/products`);
  //       setProductsData(response.data);
  //     } catch (e) {
  //       if (e.response && e.response.status === 400) {
  //         enqueueSnackbar(e.response.data.message, { variant: "error" });
  //       } else {
  //         enqueueSnackbar(
  //           "Could not fetch Products details.",
  //           {
  //             variant: "error",
  //           }
  //         );
  //       }
  //       setProductsData([]);
  //       return null;
  //     }
  //   };

  //   const fetchCartData = async () => {
  //     console.log("inside fetchCartData");
  //     try {
  //       const response = await axios.get(`${config.endpoint}/cart`, {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem("token")}`
  //         }
  //       });
  //       setCartData(response.data);
  //       //setLocalCartData(response.data); // setLocalStorageCartData(cartData);
  //     } catch (e) {
  //       if (e.response && e.response.status === 400) {
  //         enqueueSnackbar(e.response.data.message, { variant: "error" });
  //       } else {
  //         enqueueSnackbar(
  //           "Could not fetch cart.",
  //           {
  //             variant: "error",
  //           }
  //         );
  //       }
  //       setCartData([]);
  //       return null;
  //     }
  //   };

  //   // const localStorageCart = localStorage.getItem("cart");
  //   // if (localStorageCart) {
  //   //   const parsedCart = JSON.parse(localStorageCart);
  //   //   setCartData(parsedCart);
  //   // } else {
  //   //   fetchCartData();
  //   // }

  //   fetchProductsData();
  //   fetchCartData();
  // }, []);

  // // useEffect(() => {
  // //   localStorage.setItem('cart', JSON.stringify(localCartData));
  // // }, [localCartData]);

  // useEffect(() => {
  //   const cartItems = generateCartItemsFrom(cartData, productsData);
  //   setCartProductDetails(cartItems);
  //   console.log("Details of cart items:", cartProductDetails);

  //   // Save cart data to localStorage whenever it changes
  // //  localStorage.setItem("cart", JSON.stringify(cartData));
  // }, [cartData, productsData]);

  // console.log("Details of cart items:", cartProductDetails);
  // //items = cartProductDetails;
  // // items = cartData;
  // items = cartProductDetails;

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }


  // const handleQuantity = async (productId, action) => {
  //   const updatedCartData = [...cartData];
  //   const cartItemIndex = updatedCartData.findIndex(
  //     (item) => item.productId === productId
  //   );

  //   if (cartItemIndex !== -1) {
  //     if (action === "increment") {
  //       updatedCartData[cartItemIndex].qty += 1;
  //     } else if (action === "decrement") {
  //       updatedCartData[cartItemIndex].qty -= 1;
  //       if (updatedCartData[cartItemIndex].qty === 0) {
  //         updatedCartData.splice(cartItemIndex, 1);
  //       }
  //     }

  //     setCartData(updatedCartData);
  //     getTotalCartValue(updatedCartData)



  //     // Save the updated cart data to localStorage
  //    // localStorage.setItem("cart", JSON.stringify(updatedCartData));
  //   }
  // };


  return (
    // <>
    //   <Box className="cart">
    //     {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
    //     {cartProductDetails.map((product) => {
    //       return (
    //         <Box display="flex" alignItems="flex-start" padding="1rem" key={product.productId}>
    //           <Box className="image-container">
    //             <img
    //               // Add product image
    //               src={product.image}
    //               // Add product name as alt eext
    //               alt={product.name}
    //               width="100%"
    //               height="100%"
    //             />
    //           </Box>
    //           <Box
    //             display="flex"
    //             flexDirection="column"
    //             justifyContent="space-between"
    //             height="6rem"
    //             paddingX="1rem"
    //           >
    //             <div>{product.name/* Add product name */}</div>
    //             <Box
    //               display="flex"
    //               justifyContent="space-between"
    //               alignItems="center"
    //             >
    //               <ItemQuantity
    //                 // Add required props by checking implementation
    //                 value={product.qty}
    //                 handleAdd={() => handleQuantity(product.productId, "increment")}
    //                 handleDelete={() => handleQuantity(product.productId, "decrement")}
    //               />
    //               <Box padding="0.5rem" fontWeight="700">
    //                 ${product.productCost/* Add product cost */}
    //               </Box>
    //             </Box>
    //           </Box>
    //         </Box>
    //       )
    //     })

    //     }
    //     <Box
    //       padding="1rem"
    //       display="flex"
    //       justifyContent="space-between"
    //       alignItems="center"
    //     >
    //       <Box color="#3C3C3C" alignSelf="center">
    //         Order total
    //       </Box>
    //       <Box
    //         color="#3C3C3C"
    //         fontWeight="700"
    //         fontSize="1.5rem"
    //         alignSelf="center"
    //         data-testid="cart-total"
    //       >
    //         ${getTotalCartValue(items)}
    //       </Box>
    //     </Box>

    //     <Box display="flex" justifyContent="flex-end" className="cart-footer">
    //       <Button
    //         color="primary"
    //         variant="contained"
    //         startIcon={<ShoppingCart />}
    //         className="checkout-btn"
    //       >
    //         Checkout
    //       </Button>
    //     </Box>
    //   </Box>
    // </>

    <>
      {console.log("items in cart to showlye>", items)}
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
        >
          {items.map((item) => (
            <Box display="flex" alignItems="flex-start" padding="1rem">
              <Box className="image-container">
                <img
                  // Add product image
                  src={item.image}
                  // Add product name as alt eext
                  alt={item.name}
                  width="100%"
                  height="100%"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{item.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ItemQuantity
                    // Add required props by checking implementation
                    value={item.qty}
                    handleAdd={async () => {
                      await handleQuantity(item._id, item.qty + 1)
                    }}
                    handleDelete={async () => {
                      await handleQuantity(item._id, item.qty - 1)
                    }}
                  />
                  <Box padding="0.5rem" fontWeight="700">
                    ${item.cost}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={() => {
              history.push("/checkout")
            }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
